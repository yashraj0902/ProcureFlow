const fs = require('fs');
const path = 'frontend/src/pages/EvaluationScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<p className="text-sm text-gray-700 dark:text-gray-300">\s*The startup proposes a comprehensive IoT-based predictive maintenance system.*?<\/p>\s*<div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900\/20 border border-amber-200 dark:border-amber-800 rounded">\s*<span className="font-bold text-amber-800 dark:text-amber-400 text-xs uppercase">Risk Signal<\/span>\s*<p className="text-sm text-amber-700 dark:text-amber-300 mt-1">Requires 4G connectivity across all routes, which may fail in remote rural zones\.<\/p>\s*<\/div>/g;

const newSummary = \`<p className="text-sm text-gray-700 dark:text-gray-300">
              {appData?.proposal_summary || "Loading proposal summary..."}
            </p>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
              <span className="font-bold text-amber-800 dark:text-amber-400 text-xs uppercase">Risk Signal</span>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">{appData?.risk_signal || "Loading risk analysis..."}</p>
            </div>\`;

content = content.replace(regex, newSummary);
fs.writeFileSync(path, content);
