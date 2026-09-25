import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function Documents() {
  const docs = [
    { name: "Technical_Proposal_v2.pdf", size: "2.4 MB", date: "2026-09-24" },
    { name: "DPIIT_Certificate.pdf", size: "1.1 MB", date: "2026-08-10" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Center</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
           {docs.map((d, i) => (
             <li key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <FileText className="h-6 w-6 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.size} • Uploaded {d.date}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
             </li>
           ))}
        </ul>
      </div>
    </div>
  );
}
