
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Minimize2, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin' | 'ai';
  timestamp: Date;
}

// Mock product data for AI responses
const productInfo = {
  categories: ['kurtas', 'lawn suits', 'formal wear', 'accessories', 'unstitched', 'ready to wear'],
  features: ['embroidered dresses', 'traditional wear', 'modern style', 'premium quality'],
  services: ['worldwide shipping', 'local currency support', 'size guide', 'custom tailoring'],
  pricing: 'competitive prices with regular discounts',
  quality: 'authentic Pakistani fashion with traditional craftsmanship'
};

const getAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Product category queries
  if (message.includes('kurta') || message.includes('kurtas')) {
    return "We offer a beautiful collection of kurtas in various styles - from traditional embroidered pieces to modern casual wear. Our kurtas are available in different fabrics and colors. You can find them in our Ready-to-Wear and New Arrivals sections.";
  }
  
  if (message.includes('lawn') || message.includes('suit')) {
    return "Our lawn suits collection features premium quality fabrics with intricate designs. Perfect for summer wear, these suits combine comfort with elegance. Check out our Unstitched and Ready-to-Wear sections for the latest designs.";
  }
  
  if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
    return "We offer competitive pricing across all our collections. Prices vary based on fabric quality, embroidery work, and design complexity. We regularly offer discounts and have seasonal sales. You can view exact prices on each product page.";
  }
  
  if (message.includes('shipping') || message.includes('delivery')) {
    return "We provide worldwide shipping with tracking support. Delivery times vary by location - typically 3-7 business days for local delivery and 7-14 days for international shipping. Shipping costs are calculated at checkout based on your location.";
  }
  
  if (message.includes('size') || message.includes('measurement')) {
    return "We provide a comprehensive size guide for all our products. You can find detailed measurements in our Size Guide section. For custom fitting, please contact us with your measurements and we'll assist you accordingly.";
  }
  
  if (message.includes('fabric') || message.includes('material')) {
    return "We use premium quality fabrics including cotton, lawn, silk, chiffon, and blended materials. Each product page specifies the fabric type and care instructions. All our fabrics are carefully selected for comfort and durability.";
  }
  
  if (message.includes('embroidery') || message.includes('design')) {
    return "Our designs feature traditional Pakistani embroidery techniques including thread work, mirror work, and beadwork. Each piece is carefully crafted by skilled artisans, combining traditional craftsmanship with modern aesthetics.";
  }
  
  if (message.includes('return') || message.includes('exchange')) {
    return "We have a flexible return and exchange policy. Items can be returned within 14 days of delivery if unused and in original condition. Custom/tailored items may have different return conditions. Please contact us for specific return requests.";
  }
  
  if (message.includes('new') || message.includes('latest') || message.includes('arrival')) {
    return "Check out our New Arrivals section for the latest designs and trending styles. We regularly update our collection with seasonal pieces and contemporary designs that blend traditional Pakistani fashion with modern trends.";
  }
  
  if (message.includes('formal') || message.includes('party') || message.includes('wedding')) {
    return "Our formal wear collection includes elegant pieces perfect for weddings, parties, and special occasions. These feature premium fabrics with intricate embroidery and embellishments. Visit our Ready-to-Wear section for formal collections.";
  }
  
  // General queries
  if (message.includes('help') || message.includes('support')) {
    return "I'm here to help with any product-related questions! I can assist you with information about our collections, sizing, shipping, pricing, and more. Feel free to ask about specific products or browse our categories.";
  }
  
  if (message.includes('about') || message.includes('company')) {
    return "KK-Clothing specializes in authentic Pakistani fashion, offering traditional and modern dresses with worldwide shipping. We focus on quality craftsmanship, premium fabrics, and designs that celebrate Pakistani heritage while embracing contemporary style.";
  }
  
  // Default response for unrecognized queries
  return "Thank you for your question! I can help you with information about our products, categories, pricing, shipping, sizes, and more. Could you please be more specific about what you'd like to know? You can ask about kurtas, lawn suits, formal wear, accessories, or any other aspect of our collection.";
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to KK-Clothing. I\'m your AI assistant and can help you with any product-related questions. How can I assist you today?',
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // AI response for product queries
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    // Admin response for non-product queries or complex issues
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Our team is also available for any additional assistance. If you need help with orders, custom requests, or have specific concerns, we\'ll get back to you shortly!',
        sender: 'admin',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, adminResponse]);
    }, 3000);
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
            </CardTitle>
            <div className="flex space-x-1">
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
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
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
                      <p>{message.text}</p>
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
                  placeholder="Ask about our products..."
                  className="flex-1"
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
                AI assistant for product queries • Admin support available
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
