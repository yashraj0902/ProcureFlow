import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BrainCircuit, Check, X, Info, CheckCircle } from 'lucide-react';

export default function ChallengeCreate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Form, 2 = KPI Review
  const [loadingKPIs, setLoadingKPIs] = useState(false);
  const [createdChallengeId, setCreatedChallengeId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [kpiRecommendations, setKpiRecommendations] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    problem_statement: '',
    expected_outcome: '',
    budget_range: ''
  });

  const handleGenerateKPIs = async () => {
    setLoadingKPIs(true);
    try {
      // 1. Create the challenge in the backend first
      const createRes = await axios.post('http://localhost:8000/api/challenges', formData);
      const newId = createRes.data.id;
      setCreatedChallengeId(newId);
      
      // 2. Ask the engine to recommend KPIs based on the newly saved challenge context
      const res = await axios.post(`http://localhost:8000/api/kpis/${newId}/recommend`);
      setKpiRecommendations(res.data.recommendations.map((r: any) => ({ ...r, accepted: true })));
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingKPIs(false);
    }
  };

  const toggleKPI = (idx: int) => {
    const updated = [...kpiRecommendations];
    updated[idx].accepted = !updated[idx].accepted;
    setKpiRecommendations(updated);
  };

  const updateKPI = (idx: int, field: string, value: string) => {
    const updated = [...kpiRecommendations];
    updated[idx][field] = value;
    setKpiRecommendations(updated);
  };

  const handlePublish = async () => {
    const approvedKPIs = kpiRecommendations.filter(k => k.accepted);
    if (!createdChallengeId) return;
    try {
      // Approve KPIs for the created challenge
      await axios.post(`http://localhost:8000/api/kpis/${createdChallengeId}/approve`, approvedKPIs);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/government');
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 relative">
      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 transition-opacity">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm w-full shadow-2xl transform transition-all text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Challenge Published!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your challenge and success metrics have been published.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {step === 1 ? "Create Challenge" : "Review Success Metrics"}
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
           <span className={`px-2 py-1 rounded ${step === 1 ? 'bg-primary-100 text-primary-800 font-medium' : ''}`}>1. Details</span>
           <span>→</span>
           <span className={`px-2 py-1 rounded ${step === 2 ? 'bg-primary-100 text-primary-800 font-medium' : ''}`}>2. KPIs</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Challenge Title</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AI-Based Pothole Detection"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Problem Statement</label>
              <textarea
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                value={formData.problem_statement}
                onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Outcome</label>
              <textarea
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                value={formData.expected_outcome}
                onChange={(e) => setFormData({ ...formData, expected_outcome: e.target.value })}
              />
            </div>
            
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Budget Range</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md sm:text-sm dark:bg-gray-700 dark:text-white"
                value={formData.budget_range}
                onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
              >
                <option value="">Select a range</option>
                <option value="Under 10L">Under ₹10 Lakhs</option>
                <option value="10L - 50L">₹10L - ₹50L</option>
              </select>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5 flex items-start space-x-4">
              <div className="flex-shrink-0 mt-0.5">
                <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-blue-900 dark:text-blue-300">KPI & Success Criteria</h3>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                  Instead of manually defining success metrics, ProcureFlow can analyze your problem statement and recommend measurable KPIs based on industry standards and historical pilots.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleGenerateKPIs}
                    disabled={loadingKPIs || !formData.title}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loadingKPIs ? "Analyzing Challenge..." : "Generate Success Metrics"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            Review the AI-recommended KPIs for this challenge. You can edit the targets, accept, or reject them. These approved metrics will be used to automatically evaluate the startup during the pilot.
          </p>

          {kpiRecommendations.map((kpi, idx) => (
            <div key={idx} className={`bg-white dark:bg-gray-800 shadow rounded-lg border ${kpi.accepted ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-700 opacity-60'}`}>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="text" 
                      value={kpi.name} 
                      onChange={(e) => updateKPI(idx, 'name', e.target.value)}
                      className="font-bold text-lg text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 p-0"
                    />
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {kpi.category}
                    </span>
                  </div>
                  <button onClick={() => toggleKPI(idx)} className="text-sm font-medium flex items-center space-x-1">
                    {kpi.accepted ? (
                      <span className="text-green-600 flex items-center"><Check className="h-4 w-4 mr-1"/> Approved</span>
                    ) : (
                      <span className="text-gray-500 flex items-center"><X className="h-4 w-4 mr-1"/> Rejected</span>
                    )}
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Baseline</label>
                    <input 
                      type="text" 
                      value={kpi.baseline} 
                      onChange={(e) => updateKPI(idx, 'baseline', e.target.value)}
                      className="mt-1 block w-full px-2 py-1 text-sm border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Target</label>
                    <input 
                      type="text" 
                      value={kpi.target} 
                      onChange={(e) => updateKPI(idx, 'target', e.target.value)}
                      className="mt-1 block w-full px-2 py-1 text-sm font-semibold text-primary-600 border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Frequency</label>
                    <input 
                      type="text" 
                      value={kpi.measurement_frequency} 
                      onChange={(e) => updateKPI(idx, 'measurement_frequency', e.target.value)}
                      className="mt-1 block w-full px-2 py-1 text-sm border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Source</label>
                    <span className="mt-1 block w-full px-2 py-1 text-sm text-gray-700 dark:text-gray-300">
                      {kpi.data_source.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded flex space-x-3">
                   <Info className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Why this KPI?</p>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{kpi.reason}</p>
                     <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-2">Source: {kpi.source_type}</p>
                   </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
             <button
               onClick={() => setStep(1)}
               className="bg-white dark:bg-gray-800 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50"
             >
               Back
             </button>
             <button
               onClick={handlePublish}
               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
             >
               Publish Challenge
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
