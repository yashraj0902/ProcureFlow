const fs = require('fs');
const path = 'frontend/src/layouts/DashboardLayout.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add useLocation import
content = content.replace('import { Outlet, useNavigate, Link } from \'react-router-dom\';', 'import { Outlet, useNavigate, Link, useLocation } from \'react-router-dom\';');

// 2. Add useLocation hook
content = content.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const location = useLocation();');

// 3. Update the Link map
const oldLink = `            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group transition-colors duration-200"
                >
                  <Icon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-200" />
                  {link.name}
                </Link>
              );
            })}`;

const newLink = `            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (location.pathname.startsWith(link.path) && link.path !== '/dashboard/government' && link.path !== '/dashboard/startup');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={\`flex items-center px-4 py-2.5 text-sm font-medium rounded-md group transition-colors duration-200 \${
                    isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }\`}
                >
                  <Icon className={\`mr-3 h-5 w-5 transition-colors duration-200 \${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                  }\`} />
                  {link.name}
                </Link>
              );
            })}`;

content = content.replace(oldLink, newLink);
fs.writeFileSync(path, content);
