
export interface AdminNotification {
  id: string;
  userName: string;
  userMessage: string;
  timestamp: Date;
  isRead: boolean;
  chatId: string;
}

export interface UserNotification {
  id: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isFromAdmin: boolean;
}

class AdminNotificationService {
  getAdminNotifications(): AdminNotification[] {
    return JSON.parse(localStorage.getItem('adminNotifications') || '[]');
  }

  addAdminNotification(userName: string, userMessage: string, chatId: string) {
    const notifications = this.getAdminNotifications();
    const newNotification: AdminNotification = {
      id: Date.now().toString(),
      userName,
      userMessage,
      timestamp: new Date(),
      isRead: false,
      chatId
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    
    // Trigger browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(`New message from ${userName}`, {
        body: userMessage.substring(0, 100) + '...',
        icon: '/favicon.ico'
      });
    }
  }

  markAsRead(notificationId: string) {
    const notifications = this.getAdminNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    }
  }

  getUnreadCount(): number {
    return this.getAdminNotifications().filter(n => !n.isRead).length;
  }

  // User notification methods
  getUserNotifications(): UserNotification[] {
    return JSON.parse(localStorage.getItem('userNotifications') || '[]');
  }

  addUserNotification(message: string, isFromAdmin: boolean = true) {
    const notifications = this.getUserNotifications();
    const newNotification: UserNotification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
      isRead: false,
      isFromAdmin
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }

  markUserNotificationAsRead(notificationId: string) {
    const notifications = this.getUserNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      localStorage.setItem('userNotifications', JSON.stringify(notifications));
    }
  }

  getUserUnreadCount(): number {
    return this.getUserNotifications().filter(n => !n.isRead).length;
  }

  clearAllUserNotifications() {
    const notifications = this.getUserNotifications();
    notifications.forEach(n => n.isRead = true);
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }
}

export const adminNotificationService = new AdminNotificationService();
