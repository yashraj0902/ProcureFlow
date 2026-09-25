import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "STARTUP"}');

  // Hardcoded applications for the demo
  const mockApplications = [
    { id: 1, startupName: "GovTech Solutions", matchScore: 94, status: "SUBMITTED", submittedAt: "2026-09-24" },
    { id: 2, startupName: "CivicSense", matchScore: 78, status: "UNDER_REVIEW", submittedAt: "2026-09-22" }
  ];

  useEffect(() => {
    // Fetch challenge details
    setChallenge({
      id: id,
      title: "Predictive Maintenance for Public Buses",
      problem_statement: "Frequent breakdowns in public transport fleet causing delays and high maintenance costs.",
      expected_outcome: "A predictive system to alert maintenance needs 2 weeks in advance.",
      status: "OPEN",
      budget_range: "10L - 50L",
      deadline: "2026-10-25"
    });
  }, [id]);

  if (!challenge) return <div className="p-10 text-center dark:text-white">Loading...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{challenge.title}</h1>
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            {challenge.status.replace('_', ' ')}
          </span>
          {user.role === 'STARTUP' && challenge.status === 'OPEN' && (
            <Link 
              to={`/dashboard/challenges/${id}/apply`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Submit Proposal
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Challenge Details</h3>
        </div>
        <div className="px-4 py-5 sm:p-6 text-sm text-gray-700 dark:text-gray-300 space-y-4">
          <div>
            <span className="font-bold">Problem Statement:</span>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{challenge.problem_statement}</p>
          </div>
          <div>
            <span className="font-bold">Expected Outcome:</span>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{challenge.expected_outcome}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-bold">Budget:</span>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{challenge.budget_range}</p>
            </div>
            <div>
              <span className="font-bold">Deadline:</span>
              <p className="mt-1 text-gray-600 dark:text-gray-400">{challenge.deadline}</p>
            </div>
          </div>
        </div>
      </div>

      {user.role === 'GOVERNMENT' && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Startup Applications</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Review and evaluate proposals for this challenge.</p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockApplications.map((app) => (
              <li key={app.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary-600 dark:text-primary-400">{app.startupName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Submitted on: {app.submittedAt}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{app.matchScore}% Match</span>
                    <Link 
                      to={`/dashboard/applications/${app.id}/evaluate`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Evaluate
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
