const fs = require('fs');
const path = 'frontend/src/pages/PilotDetail.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace everything with a clean implementation
const newContent = `import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, FileCheck2, Calendar, PlusCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function PilotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "GOVERNMENT"}');

  const [pilotData, setPilotData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showObsModal, setShowObsModal] = useState<number | null>(null);
  const [obsValue, setObsValue] = useState("");
  
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decision, setDecision] = useState("SCALE");
  const [rationale, setRationale] = useState("");

  const fetchPilot = async () => {
    try {
      const res = await axios.get(\`http://localhost:8000/api/pilots/\${id || 1}\`);
      setPilotData(res.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPilot();
  }, [id]);

  const submitObservation = async (kpiId: number) => {
    if (!obsValue) return;
    try {
      await axios.post(\`http://localhost:8000/api/pilots/\${id || 1}/kpis/\${kpiId}/observations\`, {
        raw_value: parseFloat(obsValue)
      });
      setShowObsModal(null);
      setObsValue("");
      fetchPilot();
    } catch (e) {
      console.error(e);
    }
  };

  const submitDecision = async () => {
    if (!rationale) return;
    try {
      await axios.post(\`http://localhost:8000/api/pilots/\${id || 1}/decision\`, {
        outcome: decision,
        rationale: rationale
      });
      setShowDecisionModal(false);
      navigate('/dashboard/decisions');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !pilotData) return <div className="p-12 text-center text-gray-500">Loading live pilot data...</div>;

  const pilot = pilotData;
  const kpis = pilotData.kpis || [];
  const atRiskCount = kpis.filter((k:any) => k.status === 'AT_RISK').length;
  const overallHealth = atRiskCount > 0 ? "AT_RISK" : "ON_TRACK";

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pilot.name || (pilot.challenge?.title + " Pilot")}</h1>
          <p className="text-sm text-gray-500 mt-1">Startup: {pilot.startup?.name} • Challenge: {pilot.challenge?.title}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">{pilot.status}</span>
          <span className={\`px-3 py-1 rounded-full text-sm font-semibold \${overallHealth === 'AT_RISK' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}\`}>
            HEALTH: {overallHealth.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">KPI Performance Tracker</h2>
              <p className="text-sm text-gray-500">Automated evaluation based on submitted observations.</p>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {kpis.map((kpi: any, idx: number) => (
                <div key={idx} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-gray-400" />
                      <h4 className="font-bold text-gray-900 dark:text-white">{kpi.name}</h4>
                    </div>
                    <span className={\`px-2 py-1 rounded text-xs font-bold \${
                      kpi.status === 'ACHIEVED' ? 'bg-green-100 text-green-800' : kpi.status === 'ON_TRACK' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }\`}>
                      {kpi.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Baseline</p>
                      <p className="mt-1 font-medium text-gray-900 dark:text-white">{kpi.baseline}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Target</p>
                      <p className="mt-1 font-medium text-primary-600">{kpi.target}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded border-l-2 border-primary-500">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Current</p>
                      <p className="mt-1 font-bold text-gray-900 dark:text-white">{kpi.current} {kpi.unit}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col w-full mr-6">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">{kpi.achievement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={\`h-2 rounded-full \${kpi.status === 'ACHIEVED' ? 'bg-green-500' : kpi.status === 'ON_TRACK' ? 'bg-blue-500' : kpi.status === 'AT_RISK' ? 'bg-amber-500' : 'bg-gray-400'}\`} style={{ width: \`\${kpi.achievement}%\` }}></div>
                    </div>
                  </div>
                  
                  {user.role === 'STARTUP' && (
                    <div className="mt-4 flex justify-end">
                      <button onClick={() => setShowObsModal(kpi.id)} className="flex items-center text-xs px-3 py-1.5 bg-primary-50 text-primary-600 rounded hover:bg-primary-100">
                        <PlusCircle className="w-4 h-4 mr-1" /> Add Observation
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {kpis.length === 0 && (
                <div className="p-6 text-center text-gray-500 text-sm">No KPIs found.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Evidence Summary</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Based on current KPI performance, the pilot is <strong>{overallHealth.replace('_', ' ')}</strong>. Government review is recommended before determining the next procurement action.
            </p>
            {user.role === 'GOVERNMENT' && (
              <button onClick={() => setShowDecisionModal(true)} className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md text-sm transition-colors">
                Make Scale / Modify / Stop Decision
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Observation Modal */}
      {showObsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add Observation</h3>
            <input 
              type="number" 
              value={obsValue}
              onChange={e => setObsValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 dark:bg-gray-700 dark:text-white"
              placeholder="Enter numerical value"
            />
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowObsModal(null)} className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">Cancel</button>
              <button onClick={() => submitObservation(showObsModal)} className="px-4 py-2 bg-primary-600 text-white rounded text-sm">Save Evidence</button>
            </div>
          </div>
        </div>
      )}

      {/* Decision Modal */}
      {showDecisionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Make Final Decision</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Select the procurement outcome based on the automated evidence summary.</p>
            
            <div className="space-y-4 mb-6">
              <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input type="radio" name="decision" checked={decision === 'SCALE'} onChange={() => setDecision('SCALE')} className="h-4 w-4 text-primary-600" />
                <div className="ml-3">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">SCALE</span>
                  <span className="block text-xs text-gray-500">Pilot achieved targets. Proceed to full procurement.</span>
                </div>
              </label>
              <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input type="radio" name="decision" checked={decision === 'MODIFY'} onChange={() => setDecision('MODIFY')} className="h-4 w-4 text-amber-600" />
                <div className="ml-3">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">MODIFY</span>
                  <span className="block text-xs text-gray-500">Extend pilot or modify scope based on partial success.</span>
                </div>
              </label>
              <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <input type="radio" name="decision" checked={decision === 'STOP'} onChange={() => setDecision('STOP')} className="h-4 w-4 text-red-600" />
                <div className="ml-3">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white">STOP</span>
                  <span className="block text-xs text-gray-500">Pilot failed to meet strict minimum requirements.</span>
                </div>
              </label>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rationale / Verification Notes</label>
              <textarea 
                rows={3}
                value={rationale}
                onChange={e => setRationale(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                placeholder="Enter justification for the audit ledger..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button onClick={() => setShowDecisionModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Cancel</button>
              <button onClick={submitDecision} disabled={!rationale} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded text-sm disabled:opacity-50 transition-colors">Submit to Ledger</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
\`;

fs.writeFileSync(path, newContent);
