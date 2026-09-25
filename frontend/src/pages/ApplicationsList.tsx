import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationsList() {
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "STARTUP"}');
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('axios').then((axios) => {
      axios.default.get('http://localhost:8000/api/applications').then(res => {
        setApplications(res.data);
        setLoading(false);
      }).catch(e => {
        console.error(e);
        setLoading(false);
      });
    });
  }, []);

  const handleRowClick = (appId: number) => {
    if (user.role === 'GOVERNMENT') {
      navigate(`/dashboard/applications/${appId}/evaluate`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user.role === 'STARTUP' ? 'My Applications' : 'All Applications'}
        </h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-transparent dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {applications.map(app => (
            <li key={app.id} onClick={() => handleRowClick(app.id)}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">{app.challenge}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      {app.department}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 space-x-4">
                    <span className="text-green-600 dark:text-green-400 font-medium">{app.score}</span>
                    <p>Submitted: {app.submitted_on}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {applications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">No applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
