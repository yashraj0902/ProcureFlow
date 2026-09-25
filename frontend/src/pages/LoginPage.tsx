import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('government@procureflow.demo');
  const [password, setPassword] = useState('procureflow');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    const user = {
      email,
      role: email.includes('startup') ? 'STARTUP' : 'GOVERNMENT',
      full_name: email.includes('startup') ? 'Startup Founder' : 'Gov Official'
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'fake-jwt');
    
    if (user.role === 'GOVERNMENT') {
      navigate('/dashboard/government');
    } else {
      navigate('/dashboard/startup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full dark:bg-gray-700 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
             <p className="text-xs text-gray-500 dark:text-gray-400">Demo Accounts: government@procureflow.demo, startup@procureflow.demo (password: procureflow)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
