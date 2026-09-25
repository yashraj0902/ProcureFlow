const fs = require('fs');
const path = 'frontend/src/pages/PilotsList.tsx';
let content = fs.readFileSync(path, 'utf8');

// Use navigate for list items
content = content.replace("import axios from 'axios';", "import axios from 'axios';\nimport { useNavigate } from 'react-router-dom';");
content = content.replace("const [pilots, setPilots] = useState<any[]>([]);", "const [pilots, setPilots] = useState<any[]>([]);\n  const navigate = useNavigate();");

// Replace <li> with onClick
const oldLi = `<li key={pilot.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">`;
const newLi = `<li key={pilot.id} onClick={() => navigate(\`/dashboard/pilots/\${pilot.id}\`)}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">`;
content = content.replace(oldLi, newLi);

fs.writeFileSync(path, content);
