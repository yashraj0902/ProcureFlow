import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function ChallengesList() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "STARTUP"}');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/challenges')
      .then(res => setChallenges(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges</h1>
        {user.role === 'GOVERNMENT' && (
          <Link to="/dashboard/challenges/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Create Challenge
          </Link>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-transparent dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {challenges.map(challenge => (
            <li key={challenge.id} onClick={() => navigate(`/dashboard/challenges/${challenge.id}`)}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">{challenge.title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {challenge.status.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      Budget: {challenge.budget_range || 'Not specified'}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <p>Deadline: {challenge.deadline}</p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {challenge.problem_statement}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {challenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">No challenges found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
