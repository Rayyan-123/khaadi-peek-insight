
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, MessageCircle, Send, User, Clock } from "lucide-react";
import { adminNotificationService, type AdminNotification } from "@/services/adminNotificationService";

export const AdminDashboard = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState<AdminNotification | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const loadNotifications = () => {
      const adminNotifications = adminNotificationService.getAdminNotifications();
      setNotifications(adminNotifications);
      setUnreadCount(adminNotificationService.getUnreadCount());
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (notification: AdminNotification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      adminNotificationService.markAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const sendReply = () => {
    if (!replyMessage.trim() || !selectedNotification) return;

    // Add notification for user
    adminNotificationService.addUserNotification(
      `KK-Clothing Team: ${replyMessage}`, 
      true
    );

    // Clear reply
    setReplyMessage('');
    
    // Show success message
    alert(`Reply sent to ${selectedNotification.userName}!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              User Requests ({notifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No user requests yet
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    } ${selectedNotification?.id === notification.id ? 'bg-amber-50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-600" />
                          <p className="font-medium text-gray-900">
                            {notification.userName}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.userMessage}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {notification.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reply Panel */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedNotification ? `Reply to ${selectedNotification.userName}` : 'Select a user to reply'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedNotification ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700">User Message:</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedNotification.userMessage}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {selectedNotification.timestamp.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Reply:
                  </label>
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply to the user..."
                    rows={4}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  onClick={sendReply}
                  disabled={!replyMessage.trim()}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply to {selectedNotification.userName}
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a user request from the left to reply
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
