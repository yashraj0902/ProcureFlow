const fs = require('fs');
const path = 'frontend/src/pages/ChallengeCreate.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add state for createdChallengeId
content = content.replace("const [loadingKPIs, setLoadingKPIs] = useState(false);", "const [loadingKPIs, setLoadingKPIs] = useState(false);\n  const [createdChallengeId, setCreatedChallengeId] = useState<number | null>(null);");

// Replace handleGenerateKPIs
const oldGen = `  const handleGenerateKPIs = async () => {
    setLoadingKPIs(true);
    // Simulate creating the challenge first so we have an ID for the KPI endpoints
    try {
      // In a real app we'd POST the challenge first, here we'll mock challenge ID = 1
      const mockChallengeId = 1;
      const res = await axios.post(\`http://localhost:8000/api/kpis/\${mockChallengeId}/recommend\`);
      setKpiRecommendations(res.data.recommendations.map((r: any) => ({ ...r, accepted: true })));
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingKPIs(false);
    }
  };`;

const newGen = `  const handleGenerateKPIs = async () => {
    setLoadingKPIs(true);
    try {
      // 1. Create the challenge in the backend first
      const createRes = await axios.post('http://localhost:8000/api/challenges', formData);
      const newId = createRes.data.id;
      setCreatedChallengeId(newId);
      
      // 2. Ask the engine to recommend KPIs based on the newly saved challenge context
      const res = await axios.post(\`http://localhost:8000/api/kpis/\${newId}/recommend\`);
      setKpiRecommendations(res.data.recommendations.map((r: any) => ({ ...r, accepted: true })));
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingKPIs(false);
    }
  };`;
content = content.replace(oldGen, newGen);

// Replace handlePublish
const oldPub = `  const handlePublish = async () => {
    const approvedKPIs = kpiRecommendations.filter(k => k.accepted);
    try {
      await axios.post('http://localhost:8000/api/kpis/1/approve', approvedKPIs);
      setShowSuccess(true);`;

const newPub = `  const handlePublish = async () => {
    const approvedKPIs = kpiRecommendations.filter(k => k.accepted);
    if (!createdChallengeId) return;
    try {
      // Approve KPIs for the created challenge
      await axios.post(\`http://localhost:8000/api/kpis/\${createdChallengeId}/approve\`, approvedKPIs);
      setShowSuccess(true);`;
content = content.replace(oldPub, newPub);

fs.writeFileSync(path, content);
