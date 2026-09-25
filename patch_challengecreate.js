const fs = require('fs');
const path = 'frontend/src/pages/ChallengeCreate.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add showSuccess state
content = content.replace("const [loadingKPIs, setLoadingKPIs] = useState(false);", "const [loadingKPIs, setLoadingKPIs] = useState(false);\n  const [showSuccess, setShowSuccess] = useState(false);");

// Replace alert with setShowSuccess and navigate
const oldPublish = `    try {
      await axios.post('http://localhost:8000/api/kpis/1/approve', approvedKPIs);
      alert("Challenge and KPIs published successfully!");
      navigate('/dashboard/government');
    } catch (e) {`;
const newPublish = `    try {
      await axios.post('http://localhost:8000/api/kpis/1/approve', approvedKPIs);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/government');
      }, 2000);
    } catch (e) {`;
content = content.replace(oldPublish, newPublish);

// Add the Success Modal UI at the start of the return statement
const successModal = `
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
`;

content = content.replace("return (\n    <div className=\"max-w-4xl mx-auto space-y-6 pb-12\">", "return (\n    <div className=\"max-w-4xl mx-auto space-y-6 pb-12 relative\">" + successModal);

// Import CheckCircle if not already imported
if (!content.includes("CheckCircle")) {
    content = content.replace("import { BrainCircuit, Check, X, Info } from 'lucide-react';", "import { BrainCircuit, Check, X, Info, CheckCircle } from 'lucide-react';");
}

fs.writeFileSync(path, content);
