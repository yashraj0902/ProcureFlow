import React from 'react';
import { Search, BookOpen } from 'lucide-react';

export default function KnowledgeBase() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Innovation Knowledge Base</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
         <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:text-white"
              placeholder="Search previous pilots, technologies, departments..."
            />
         </div>
         
         <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                <BookOpen className="h-6 w-6 text-primary-500 mr-4 mt-1" />
                <div>
                   <h3 className="font-semibold text-gray-900 dark:text-white">Whitepaper: Scaling IoT in Municipal Waste Collection</h3>
                   <p className="text-sm text-gray-500 mt-1">Based on the SwachhSystems pilot conducted by MHUA. Contains baseline metrics and implementation guidelines.</p>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
