'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <Menu as="div" className="relative ml-4">
      {({ open }) => (
        <>
          <Menu.Button className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span className="sr-only">Voir les notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-500"
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-gray-500">Aucune notification</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                      {({ active }) => (
                        <div
                          className={`flex items-start px-4 py-3 text-sm ${!notification.read ? 'bg-blue-50' : ''
                            } ${active ? 'bg-gray-50' : ''}`}
                          onClick={() => !notification.read && markAsRead(notification.id)}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <span className="text-lg">{notification.icon}</span>
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.user}{' '}
                              <span className="font-normal text-gray-600">
                                {notification.action}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              Il y a {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="ml-4">
                              <span className="inline-flex items-center rounded-full bg-blue-100 p-0.5">
                                <CheckIcon className="h-3 w-3 text-blue-600" aria-hidden="true" />
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </Menu.Item>
                  ))
                )}
              </div>
              <div className="border-t border-gray-200 px-4 py-2 text-center">
                <a
                  href="#"
                  className="text-xs font-medium text-blue-600 hover:text-blue-500"
                >
                  Voir toutes les notifications
                </a>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
