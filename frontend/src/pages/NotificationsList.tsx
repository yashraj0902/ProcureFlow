import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationsList() {
  const notifs = [
    { text: "Your application for 'Digital Tracking of Mid-Day Meals' was received.", time: "2 hours ago" },
    { text: "System Alert: Diagnostic Accuracy KPI is at risk.", time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
           {notifs.map((n, i) => (
             <li key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex space-x-4">
                <Bell className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{n.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                </div>
             </li>
           ))}
        </ul>
      </div>
    </div>
  );
}
