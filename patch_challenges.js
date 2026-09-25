const fs = require('fs');
const path = 'frontend/src/pages/ChallengesList.tsx';
let content = fs.readFileSync(path, 'utf8');

// Use navigate for list items
content = content.replace("import { Link } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';");
content = content.replace("const user = JSON.parse(localStorage.getItem('user') || '{\"role\": \"STARTUP\"}');", "const user = JSON.parse(localStorage.getItem('user') || '{\"role\": \"STARTUP\"}');\n  const navigate = useNavigate();");

// Replace <li> with onClick
const oldLi = `<li key={challenge.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">`;
const newLi = `<li key={challenge.id} onClick={() => navigate(\`/dashboard/challenges/\${challenge.id}\`)}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">`;
content = content.replace(oldLi, newLi);

// Fix UNDER_EVALUATION
content = content.replace("{challenge.status}", "{challenge.status.replace('_', ' ')}");

fs.writeFileSync(path, content);
