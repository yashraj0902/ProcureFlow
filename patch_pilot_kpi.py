import re

with open("frontend/src/pages/PilotDetail.tsx", "r") as f:
    content = f.read()

pattern = re.compile(r'\{\/\* Fake mini sparkline visualization \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\)\)\}', re.DOTALL)

new_kpi_ui = """{/* Progress Bar & Actions */}
                     <div className="mt-4 flex justify-between items-end">
                       <div className="w-full mr-6">
                         <div className="flex justify-between text-xs mb-1">
                           <span className="text-gray-500">Progress</span>
                           <span className="font-bold text-gray-700 dark:text-gray-300">{kpi.achievement}%</span>
                         </div>
                         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                           <div className={`h-2 rounded-full ${kpi.status === 'ACHIEVED' ? 'bg-green-500' : kpi.status === 'ON_TRACK' ? 'bg-blue-500' : kpi.status === 'AT_RISK' ? 'bg-amber-500' : 'bg-gray-400'}`} style={{ width: `${kpi.achievement}%` }}></div>
                         </div>
                       </div>
                       {user.role === 'STARTUP' && (
                         <button onClick={() => setShowObsModal(kpi.id)} className="flex items-center whitespace-nowrap text-xs px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded hover:bg-primary-100 transition-colors">
                           <PlusCircle className="w-4 h-4 mr-1" /> Add Observation
                         </button>
                       )}
                     </div>
                  </div>
                ))}"""

content = pattern.sub(new_kpi_ui, content)

with open("frontend/src/pages/PilotDetail.tsx", "w") as f:
    f.write(content)
