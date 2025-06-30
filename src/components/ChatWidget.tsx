
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Minimize2, Bot, User, CreditCard } from "lucide-react";
import { aiService, saveChatMessage, type ChatMessage } from "@/services/aiService";
import { adminNotificationService } from "@/services/adminNotificationService";
import { PaymentDetails } from "@/components/PaymentDetails";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [userName, setUserName] = useState('');
  const [hasProvidedName, setHasProvidedName] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! Welcome to KK-Clothing. I\'m your AI assistant and can help you with detailed information about our products, prices, sizes, colors, and more.\n\nIf you need to speak with our team directly, please provide your name and we\'ll connect you!\n\nآپ اردو، رومن اردو، انگریزی، ہندی یا رومن ہندی میں سوال کر سکتے ہیں۔\n\nAap Urdu, Roman Urdu, English, Hindi ya Roman Hindi mein sawal kar sakte hain.\n\n📞 To talk to our team, you can visit Contact Us or call us/WhatsApp us at +92 300 1234567\n\n💬 You can also request me to connect you with the KK-Clothing team!',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Check if user wants to connect with team
    const needsHumanAssistance = newMessage.toLowerCase().includes('talk') || 
                                newMessage.toLowerCase().includes('connect') || 
                                newMessage.toLowerCase().includes('speak') ||
                                newMessage.toLowerCase().includes('help') ||
                                newMessage.toLowerCase().includes('support') ||
                                newMessage.toLowerCase().includes('team') ||
                                newMessage.toLowerCase().includes('baat') ||
                                newMessage.toLowerCase().includes('madad') ||
                                newMessage.toLowerCase().includes('kk-clothing') ||
                                newMessage.toLowerCase().includes('kk clothing');

    if (needsHumanAssistance && !hasProvidedName) {
      const nameResponse: ChatMessage = {
        id: Date.now().toString(),
        text: 'To connect you with our team, please provide your name so we can assist you personally.\n\nHamari team se connect karne ke liye, kripaya apna naam batayein taki hum aapki personal madad kar sakein.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, nameResponse]);
      return;
    }

    // If this looks like a name (simple heuristic)
    if (!hasProvidedName && newMessage.trim().split(' ').length <= 3 && !newMessage.includes('?') && newMessage.trim().length < 50) {
      setUserName(newMessage.trim());
      setHasProvidedName(true);
      
      const welcomeResponse: ChatMessage = {
        id: Date.now().toString(),
        text: `Thank you ${newMessage.trim()}! I've noted your name. Our team will be able to see your messages and respond to you personally. How can we help you today?\n\nShukriya ${newMessage.trim()}! Maine aapka naam note kar liya hai. Hamari team aapke messages dekh sakegi aur aapko personal jawab degi. Aaj hum aapki kaise madad kar sakte hain?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeResponse]);
      
      // Notify admin that user wants to connect
      adminNotificationService.addAdminNotification(
        newMessage.trim(), 
        `User ${newMessage.trim()} wants to connect with the team`, 
        Date.now().toString()
      );
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      isAdminVisible: true
    };

    setMessages(prev => [...prev, userMessage]);
    saveChatMessage(userMessage);

    // If user has provided name, notify admin about their message
    if (hasProvidedName && userName) {
      adminNotificationService.addAdminNotification(userName, newMessage, userMessage.id);
    }

    setNewMessage('');

    // AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiService.getProductResponse(newMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      saveChatMessage(aiResponse);
    }, 1000);

    // Show payment details for payment-related queries
    if (newMessage.toLowerCase().includes('payment') || 
        newMessage.toLowerCase().includes('pay') || 
        newMessage.toLowerCase().includes('bank') || 
        newMessage.toLowerCase().includes('paisa') ||
        newMessage.toLowerCase().includes('qeemat')) {
      setTimeout(() => {
        setShowPaymentDetails(true);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-amber-600 hover:bg-amber-700 shadow-lg"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 shadow-lg transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'}`}>
        <CardHeader className="p-3 bg-amber-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <Bot className="w-4 h-4 mr-1" />
              KK-Clothing AI Assistant
              {hasProvidedName && userName && (
                <span className="ml-2 text-xs bg-amber-700 px-2 py-1 rounded">
                  {userName}
                </span>
              )}
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                className="h-6 w-6 text-white hover:bg-amber-700"
              >
                <CreditCard className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 text-white hover:bg-amber-700"
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-white hover:bg-amber-700"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {showPaymentDetails && (
              <div className="p-3 border-b bg-amber-50">
                <PaymentDetails />
              </div>
            )}
            
            <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${showPaymentDetails ? 'h-40' : ''}`}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg text-sm flex items-start space-x-2 ${
                      message.sender === 'user'
                        ? 'bg-amber-600 text-white'
                        : message.sender === 'ai'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {message.sender === 'user' && <User className="w-3 h-3" />}
                      {message.sender === 'ai' && <Bot className="w-3 h-3" />}
                      {message.sender === 'admin' && <MessageCircle className="w-3 h-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="whitespace-pre-line" style={{ direction: /[\u0600-\u06FF]/.test(message.text) ? 'rtl' : 'ltr' }}>
                        {message.text}
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    !hasProvidedName 
                      ? "Ask in English, Urdu, Hindi... | Type your name to connect with team"
                      : "Ask in English, Urdu, Hindi... | Urdu/Hindi mein sawal karein..."
                  }
                  className="flex-1"
                  style={{ direction: /[\u0600-\u06FF]/.test(newMessage) ? 'rtl' : 'ltr' }}
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Multilingual AI support • اردو، انگریزی، ہندی میں سپورٹ • Live team support available
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
