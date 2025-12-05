'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: number;
  user: string;
  action: string;
  time: string;
  icon: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, user: 'Marie D.', action: 'a publié un nouvel avis', time: '2 min', icon: '💬', read: false },
    { id: 2, user: 'Thomas L.', action: 'a partagé un commentaire', time: '15 min', icon: '💡', read: false },
    { id: 3, user: 'Sophie M.', action: 'a noté 5 étoiles', time: '1h', icon: '⭐', read: false },
    { id: 4, user: 'Alex R.', action: 'a partagé sur les réseaux', time: '3h', icon: '📱', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    const newId = Math.max(0, ...notifications.map(n => n.id)) + 1;
    setNotifications([
      {
        id: newId,
        ...notification,
        read: false
      },
      ...notifications
    ]);
  };

  return (
    <NotificationContext.Provider 
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
