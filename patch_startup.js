const fs = require('fs');
const path = 'frontend/src/pages/StartupDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('<span className="text-xs text-primary-600 cursor-pointer hover:underline">View Ledger</span>', '<Link to="/dashboard/track-record" className="text-xs text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">View Ledger</Link>');
content = content.replace('<span className="text-xs text-primary-600 cursor-pointer hover:underline">View all</span>', '<Link to="/dashboard/challenges" className="text-xs text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">View all</Link>');

fs.writeFileSync(path, content);
