const fs = require('fs');
const path = 'frontend/src/pages/ApplicationsList.tsx';
let content = fs.readFileSync(path, 'utf8');

// Reset to avoid the sed mess
content = content.replace(/id: 1,/g, "id: 999,");
content = content.replace(/id: 2,/g, "id: 1,");
content = content.replace(/id: 999,/g, "id: 2,");

fs.writeFileSync(path, content);
