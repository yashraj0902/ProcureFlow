import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PilotsList() {
  const [pilots, setPilots] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/pilots')
      .then(res => setPilots(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Pilots</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-transparent dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {pilots.map(pilot => (
            <li key={pilot.id} onClick={() => navigate(`/dashboard/pilots/${pilot.id}`)}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">{pilot.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {pilot.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex flex-col">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-semibold">
                      Startup: {pilot.startup_name}
                    </p>
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Challenge: {pilot.challenge_title}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <p>Timeline: {pilot.start_date} to {pilot.end_date}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {pilots.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">No active pilots found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
