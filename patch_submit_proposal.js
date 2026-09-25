const fs = require('fs');
const path = 'frontend/src/pages/SubmitProposal.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes("axios")) {
    content = content.replace("import { useParams, useNavigate } from 'react-router-dom';", "import { useParams, useNavigate } from 'react-router-dom';\nimport axios from 'axios';");
}

const oldSubmit = `  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard/applications');
    }, 2000);
  };`;

const newSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/applications', {
        challenge_id: parseInt(id || '1'),
        technical_approach: formData.technicalApproach,
        experience: formData.experience,
        budget: formData.budget,
        timeline: formData.timeline
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/applications');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };`;

content = content.replace(oldSubmit, newSubmit);
fs.writeFileSync(path, content);
