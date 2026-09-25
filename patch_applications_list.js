const fs = require('fs');
const path = 'frontend/src/pages/ApplicationsList.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the component body
const newBody = `export default function ApplicationsList() {
  const user = JSON.parse(localStorage.getItem('user') || '{"role": "STARTUP"}');
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('axios').then((axios) => {
      axios.default.get('http://localhost:8000/api/applications').then(res => {
        setApplications(res.data);
        setLoading(false);
      }).catch(e => {
        console.error(e);
        setLoading(false);
      });
    });
  }, []);

  const handleRowClick = (appId: number) => {
    if (user.role === 'GOVERNMENT') {
      navigate(\`/dashboard/applications/\${appId}/evaluate\`);
    }
  };`;

content = content.replace(/export default function ApplicationsList\(\) \{[\s\S]*?const applications = \[[\s\S]*?\];/m, newBody);

fs.writeFileSync(path, content);
