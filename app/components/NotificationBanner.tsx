'use client';

import { useNotifications } from '../contexts/NotificationContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function NotificationBanner() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const latestUnread = notifications.find(n => !n.read);

  if (!latestUnread || unreadCount === 0) return null;

  return (
    <div className="mb-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
        <div className="flex items-start">
          <div className="shrink-0 pt-0.5">
            <div className="h-5 w-5 text-blue-500">{latestUnread.icon}</div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-blue-800">
              {latestUnread.user}
            </p>
            <p className="text-sm text-blue-700 mt-1">
              {latestUnread.action}
            </p>
            {unreadCount > 1 && (
              <p className="mt-1 text-xs text-blue-600">
                +{unreadCount - 1} autres notifications
              </p>
            )}
          </div>
          <div className="ml-4 shrink-0">
            <button
              type="button"
              onClick={() => markAsRead(latestUnread.id)}
              className="inline-flex rounded-md text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              <span className="sr-only">Fermer</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
