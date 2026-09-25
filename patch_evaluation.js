const fs = require('fs');
const path = 'frontend/src/pages/EvaluationScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add useEffect and axios
if (!content.includes("useEffect")) {
    content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';\nimport axios from 'axios';");
}

// Add state for appData
content = content.replace("const [scores, setScores] = useState({", "const [appData, setAppData] = useState<any>(null);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() => {\n    axios.get(`http://localhost:8000/api/applications/${id || 1}`).then(res => {\n      setAppData(res.data);\n      setLoading(false);\n    }).catch(e => {\n      console.error(e);\n      setLoading(false);\n    });\n  }, [id]);\n\n  const [scores, setScores] = useState({");

// Update JSX to use appData
const oldStartup = `<div className="bg-gray-800/50 p-4 rounded text-sm text-gray-300">
              <p className="font-semibold text-white mb-2">Startup Details</p>
              <p className="text-primary-400 font-medium cursor-pointer">GovTech Solutions</p>
              <p className="text-xs text-gray-400 mt-1">DPIIT Recognized • E-Governance</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Previous Track Record</p>
                <p>2 Verified Pilots</p>
              </div>
            </div>`;
const newStartup = `<div className="bg-gray-800/50 p-4 rounded text-sm text-gray-300">
              <p className="font-semibold text-white mb-2">Startup Details</p>
              <p className="text-primary-400 font-medium cursor-pointer">{appData?.startup?.name || "GovTech Solutions"}</p>
              <p className="text-xs text-gray-400 mt-1">{appData?.startup?.dpiit ? "DPIIT Recognized" : "Startup"} • {appData?.startup?.domain}</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Previous Track Record</p>
                <p>2 Verified Pilots</p>
              </div>
            </div>`;
content = content.replace(oldStartup, newStartup);

const oldSummary = `<p className="text-gray-300 text-sm leading-relaxed mb-4">
            The startup proposes a comprehensive IoT-based predictive maintenance system. By utilizing edge-computing sensors on the bus engines, it transmits telemetry data via cellular networks to a central cloud analytics engine.
          </p>
          <div className="p-4 rounded bg-amber-900/20 border border-amber-900/50">
            <p className="text-xs font-bold text-amber-500 uppercase mb-1">Risk Signal</p>
            <p className="text-sm text-amber-200/80">
              Requires 4G connectivity across all routes, which may fail in remote rural zones.
            </p>
          </div>`;
const newSummary = `<p className="text-gray-300 text-sm leading-relaxed mb-4">
            {appData?.proposal_summary || "Loading proposal summary..."}
          </p>
          <div className="p-4 rounded bg-amber-900/20 border border-amber-900/50">
            <p className="text-xs font-bold text-amber-500 uppercase mb-1">Risk Signal</p>
            <p className="text-sm text-amber-200/80">
              {appData?.risk_signal || "Loading risk analysis..."}
            </p>
          </div>`;
content = content.replace(oldSummary, newSummary);

fs.writeFileSync(path, content);
