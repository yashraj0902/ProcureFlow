import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function EvaluationScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/applications/${id || 1}`).then(res => {
      setAppData(res.data);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, [id]);

  const [scores, setScores] = useState({
    technicalFit: 0,
    innovation: 0,
    feasibility: 0,
    pilotReadiness: 0
  });

  const handleScoreChange = (field: string, value: string) => {
    setScores({ ...scores, [field]: parseInt(value) || 0 });
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const averageScore = totalScore / 4;

  const submitEvaluation = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard/government');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Government Evaluation</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Proposal Summary (AI Extracted)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {appData?.proposal_summary || "Loading proposal summary..."}
            </p>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
              <span className="font-bold text-amber-800 dark:text-amber-400 text-xs uppercase">Risk Signal</span>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">{appData?.risk_signal || "Loading risk analysis..."}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scorecard</h3>
            <div className="space-y-4">
              {[
                { id: 'technicalFit', label: 'Technical Fit (0-10)' },
                { id: 'innovation', label: 'Innovation (0-10)' },
                { id: 'feasibility', label: 'Feasibility (0-10)' },
                { id: 'pilotReadiness', label: 'Pilot Readiness (0-10)' }
              ].map(crit => (
                <div key={crit.id} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{crit.label}</label>
                  <input 
                    type="number" 
                    min="0" max="10" 
                    className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    value={scores[crit.id as keyof typeof scores] || ''}
                    onChange={(e) => handleScoreChange(crit.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900 dark:text-white">Final Score: {averageScore.toFixed(1)} / 10</span>
              <button 
                onClick={submitEvaluation}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Submit & Shortlist
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Startup Details</h3>
            <p className="text-sm font-bold text-primary-600 dark:text-primary-400">GovTech Solutions</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">DPIIT Recognized • E-Governance</p>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">Previous Track Record</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">2 Verified Pilots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
