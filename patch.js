const fs = require('fs');
const path = 'frontend/src/pages/StartupDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacement = `            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recommended.map((rec, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150">
                     <h4 className="font-medium text-gray-900 dark:text-white">{rec.title}</h4>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rec.department}</p>
                     <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400 font-medium">{rec.match} Match</span>
                        <span className="text-gray-400">Closes in {rec.deadline}</span>
                     </div>
                  </div>
                ))}
            </div>
         </div>

         {/* Track Record */}
         <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Verified Track Record</h3>
              <span className="text-xs text-primary-600 cursor-pointer hover:underline">View Ledger</span>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {trackRecord.map((tr, idx) => (
                  <div key={idx} className="p-4 bg-green-50/50 dark:bg-green-900/10">
                     <div className="flex items-center space-x-2">
                         <span className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs px-2 py-0.5 rounded font-medium border border-green-200 dark:border-green-800">VERIFIED PILOT</span>
                         <h4 className="font-medium text-gray-900 dark:text-white">{tr.title}</h4>
                     </div>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{tr.result}</p>
                     <p className="text-xs text-gray-400 mt-2">Validated on: {tr.date}</p>
                  </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
`;

const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.includes('<div className="divide-y divide-gray-200 dark:divide-gray-700">'));
content = lines.slice(0, startIndex).join('\n') + '\n' + replacement;

fs.writeFileSync(path, content);
