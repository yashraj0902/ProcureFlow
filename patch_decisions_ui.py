content = """import React, { useState, useEffect } from 'react';
import { Scale, RefreshCw, XCircle } from 'lucide-react';
import axios from 'axios';

export default function Decisions() {
  const [decisions, setDecisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pilots/all/decisions').then(res => {
      setDecisions(res.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const getIcon = (outcome: string) => {
    if (outcome === 'SCALE') return <Scale className="w-5 h-5 text-green-600" />;
    if (outcome === 'MODIFY') return <RefreshCw className="w-5 h-5 text-amber-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getBadgeClass = (outcome: string) => {
    if (outcome === 'SCALE') return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    if (outcome === 'MODIFY') return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Loading ledger...</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Auditable Decisions Ledger</h1>
        <p className="text-sm text-gray-500 mt-1">Immutable record of final procurement outcomes based on pilot evidence.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {decisions.map((dec, idx) => (
            <li key={idx} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    dec.outcome === 'SCALE' ? 'bg-green-50 dark:bg-green-900/20' : 
                    dec.outcome === 'MODIFY' ? 'bg-amber-50 dark:bg-amber-900/20' : 
                    'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    {getIcon(dec.outcome)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{dec.challenge}</h3>
                    <p className="text-sm text-gray-500 mt-1">{dec.pilot_name} • Startup: {dec.startup}</p>
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">Evidence Rationale:</span> {dec.rationale}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeClass(dec.outcome)}`}>
                    {dec.outcome}
                  </span>
                  <span className="text-xs text-gray-500">Recorded: {dec.date}</span>
                </div>
              </div>
            </li>
          ))}
          {decisions.length === 0 && (
            <div className="p-12 text-center text-gray-500">No decisions have been recorded yet.</div>
          )}
        </ul>
      </div>
    </div>
  );
}
"""

with open("frontend/src/pages/Decisions.tsx", "w") as f:
    f.write(content)
