import React from 'react';
import { BarChart, Activity, TrendingUp } from 'lucide-react';

export default function KPIPerformance() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KPI & Performance Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 text-gray-900 dark:text-white mb-2">
            <Activity className="h-5 w-5 text-primary-500" />
            <h3 className="font-semibold">Active Monitoring</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">14</p>
          <p className="text-sm text-gray-500 mt-1">Live KPIs being tracked</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 text-green-600 dark:text-green-400 mb-2">
            <TrendingUp className="h-5 w-5" />
            <h3 className="font-semibold text-gray-900 dark:text-white">On Track</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">11</p>
          <p className="text-sm text-gray-500 mt-1">Meeting or exceeding targets</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 text-amber-500 mb-2">
            <BarChart className="h-5 w-5" />
            <h3 className="font-semibold text-gray-900 dark:text-white">At Risk</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">3</p>
          <p className="text-sm text-gray-500 mt-1">Requires attention</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-10 text-center">
         <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Global Analytics Dashboard</h2>
         <p className="text-gray-500 dark:text-gray-400">Detailed performance charts will appear here as pilots generate sufficient historical data.</p>
      </div>
    </div>
  );
}
