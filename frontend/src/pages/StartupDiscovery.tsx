import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StartupDiscovery() {
  const [startups, setStartups] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/startups')
      .then(res => setStartups(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Startup Discovery</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-transparent dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {startups.map(startup => (
            <li key={startup.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">{startup.company_name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Profile: {startup.profile_completeness}%
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      {startup.industry}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <p>{startup.dpiit_recognized ? "DPIIT Recognized" : ""}</p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {startup.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {startups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">No startups found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
