import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop() || 'Page';
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-10 max-w-lg w-full border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title.replace('-', ' ')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          This section is currently under development for the ProcureFlow prototype.
        </p>
      </div>
    </div>
  );
}
