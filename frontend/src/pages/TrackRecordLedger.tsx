import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TrackRecordLedger() {
  const [trackRecord, setTrackRecord] = useState<any[]>([]);

  useEffect(() => {
    // Re-fetch startup dashboard data just for the track record
    axios.get('http://localhost:8000/api/dashboard/startup')
      .then(res => setTrackRecord(res.data.track_record))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verified Track Record Ledger</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-transparent dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            This ledger contains all pilots that have been independently validated and reviewed by government departments. This acts as verified proof of capability for future challenges.
          </p>
        </div>
        
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {trackRecord.map((tr, idx) => (
            <li key={idx} className="p-6">
              <div className="flex items-center space-x-3 mb-2">
                 <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded font-bold border border-green-200 dark:border-green-800 tracking-wider">
                   VERIFIED
                 </span>
                 <h4 className="text-lg font-medium text-gray-900 dark:text-white">{tr.title}</h4>
              </div>
              
              <div className="mt-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                 <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Outcome & Performance</span>
                 <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">{tr.result}</p>
              </div>
              
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                 Validated by Government Review on <span className="font-medium text-gray-700 dark:text-gray-300">{tr.date}</span>
              </div>
            </li>
          ))}
        </ul>
        {trackRecord.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">No verified track records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
