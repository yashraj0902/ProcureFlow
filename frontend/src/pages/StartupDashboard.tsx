import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StartupDashboard() {
  const [stats, setStats] = useState({
    profile_completeness: 0,
    recommended_challenges: 0,
    active_applications: 0,
    active_pilots: 0,
    verified_pilots: 0
  });
  
  const [recommended, setRecommended] = useState<any[]>([]);
  const [trackRecord, setTrackRecord] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard/startup')
      .then(res => {
        setStats(res.data.stats);
        setRecommended(res.data.recommended);
        setTrackRecord(res.data.track_record);
      })
      .catch(err => {
        console.error("Error fetching startup dashboard data", err);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Startup Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { name: 'Profile Completeness', value: `${stats.profile_completeness}%` },
          { name: 'Recommended Challenges', value: stats.recommended_challenges },
          { name: 'Active Applications', value: stats.active_applications },
          { name: 'Active Pilots', value: stats.active_pilots },
          { name: 'Verified Pilots', value: stats.verified_pilots },
        ].map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</dd>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Recommended Challenges */}
         <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recommended Challenges</h3>
              <Link to="/dashboard/challenges" className="text-xs text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recommended.map((rec, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">
                     <h4 className="font-medium text-gray-900 dark:text-white">{rec.title}</h4>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rec.department}</p>
                     <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">{rec.match} Match</span>
                        <span className="text-gray-400">Closes in {rec.deadline}</span>
                     </div>
                  </div>
                ))}
            </div>
         </div>

         {/* Track Record */}
         <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Verified Track Record</h3>
              <Link to="/dashboard/track-record" className="text-xs text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">View Ledger</Link>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {trackRecord.map((tr, idx) => (
                  <div key={idx} className="p-4 bg-green-50/50 dark:bg-green-900/10">
                     <div className="flex items-center space-x-2">
                         <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs px-2 py-0.5 rounded font-medium border border-green-200 dark:border-green-800">VERIFIED PILOT</span>
                         <h4 className="font-medium text-gray-900 dark:text-white">{tr.title}</h4>
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tr.result}</p>
                     <p className="text-xs text-gray-400 mt-2">Validated on: {tr.date}</p>
                  </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
