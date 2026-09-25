import React from 'react';
import { User } from 'lucide-react';

export default function UserProfile() {
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "STARTUP", "name": "Startup Founder"}');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
         <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name || "User Name"}</h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{user.role}</p>
            </div>
         </div>
         <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" disabled value="user@procureflow.demo" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 sm:text-sm" />
            </div>
            {user.role === 'STARTUP' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">DPIIT Recognition Number</label>
                <input type="text" disabled value="DIPP12345" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-500 sm:text-sm" />
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
