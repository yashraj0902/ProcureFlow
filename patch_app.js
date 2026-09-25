const fs = require('fs');
const path = 'frontend/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Imports
const newImports = `
import ApplicationsList from './pages/ApplicationsList';
import KPIPerformance from './pages/KPIPerformance';
import Decisions from './pages/Decisions';
import KnowledgeBase from './pages/KnowledgeBase';
import NotificationsList from './pages/NotificationsList';
import UserProfile from './pages/UserProfile';
import Documents from './pages/Documents';
`;
content = content.replace("function App() {", newImports + "\nfunction App() {");

// Routes
content = content.replace("<Route path=\"applications\" element={<PlaceholderPage />} />", "<Route path=\"applications\" element={<ApplicationsList />} />");
content = content.replace("<Route path=\"kpi\" element={<PlaceholderPage />} />", "<Route path=\"kpi\" element={<KPIPerformance />} />");
content = content.replace("<Route path=\"decisions\" element={<PlaceholderPage />} />", "<Route path=\"decisions\" element={<Decisions />} />");
content = content.replace("<Route path=\"knowledge\" element={<PlaceholderPage />} />", "<Route path=\"knowledge\" element={<KnowledgeBase />} />");
content = content.replace("<Route path=\"notifications\" element={<PlaceholderPage />} />", "<Route path=\"notifications\" element={<NotificationsList />} />");
content = content.replace("<Route path=\"profile\" element={<PlaceholderPage />} />", "<Route path=\"profile\" element={<UserProfile />} />");
content = content.replace("<Route path=\"documents\" element={<PlaceholderPage />} />", "<Route path=\"documents\" element={<Documents />} />");

fs.writeFileSync(path, content);
