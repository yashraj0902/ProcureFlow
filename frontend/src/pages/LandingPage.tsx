import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-primary-700 tracking-tight">ProcureFlow</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          From Government Problem to Verified Innovation
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          An innovation-procurement lifecycle platform that helps government departments discover eligible startups, run controlled pilots, measure outcomes and make evidence-based scale decisions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md flex justify-center space-x-4">
        <Link
          to="/login"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Login
        </Link>
        <Link
          to="/dashboard/government"
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Explore Platform
        </Link>
      </div>
    </div>
  );
}
