import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, Bell, User, LayoutDashboard, Target, Briefcase, CheckSquare, Search, Moon, Sun } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  // Mock user for now
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "GOVERNMENT", "full_name": "Gov Official"}');
  
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const govLinks = [
    { name: 'Dashboard', path: '/dashboard/government', icon: LayoutDashboard },
    { name: 'Challenges', path: '/dashboard/challenges', icon: Target },
    { name: 'Startup Discovery', path: '/dashboard/startups', icon: Search },
    { name: 'Applications', path: '/dashboard/applications', icon: Briefcase },
    { name: 'Pilots', path: '/dashboard/pilots', icon: Target },
    { name: 'KPI & Performance', path: '/dashboard/kpi', icon: LayoutDashboard },
    { name: 'Decisions', path: '/dashboard/decisions', icon: CheckSquare },
    { name: 'Knowledge Base', path: '/dashboard/knowledge', icon: Search },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const startupLinks = [
    { name: 'Dashboard', path: '/dashboard/startup', icon: LayoutDashboard },
    { name: 'Challenges', path: '/dashboard/challenges', icon: Target },
    { name: 'My Applications', path: '/dashboard/applications', icon: Briefcase },
    { name: 'My Pilots', path: '/dashboard/pilots', icon: Target },
    { name: 'Track Record', path: '/dashboard/track-record', icon: CheckSquare },
    { name: 'Documents', path: '/dashboard/documents', icon: Briefcase },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const links = user.role === 'GOVERNMENT' ? govLinks : startupLinks;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold text-primary-700 dark:text-primary-400 tracking-tight">ProcureFlow</span>
        </div>
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (location.pathname.startsWith(link.path) && link.path !== '/dashboard/government' && link.path !== '/dashboard/startup');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md group transition-colors duration-200 ${
                    isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                  }`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-200">
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {user.role === 'GOVERNMENT' ? 'Ministry of Housing and Urban Affairs' : 'UrbanTech AI'}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
            </button>
            <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-4">
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-400 font-medium transition-colors duration-200">
                {user.full_name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.full_name}</span>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 ml-4 transition-colors duration-200">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
