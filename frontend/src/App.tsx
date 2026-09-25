import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import GovernmentDashboard from './pages/GovernmentDashboard';
import StartupDashboard from './pages/StartupDashboard';
import ChallengeCreate from './pages/ChallengeCreate';
import PlaceholderPage from './pages/PlaceholderPage';
import StartupDiscovery from './pages/StartupDiscovery';
import ChallengesList from './pages/ChallengesList';
import PilotsList from './pages/PilotsList';
import ChallengeDetail from './pages/ChallengeDetail';
import EvaluationScreen from './pages/EvaluationScreen';
import TrackRecordLedger from './pages/TrackRecordLedger';
import SubmitProposal from './pages/SubmitProposal';
import PilotDetail from './pages/PilotDetail';


import ApplicationsList from './pages/ApplicationsList';
import KPIPerformance from './pages/KPIPerformance';
import Decisions from './pages/Decisions';
import KnowledgeBase from './pages/KnowledgeBase';
import NotificationsList from './pages/NotificationsList';
import UserProfile from './pages/UserProfile';
import Documents from './pages/Documents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="government" element={<GovernmentDashboard />} />
          <Route path="startup" element={<StartupDashboard />} />
          <Route path="challenges/new" element={<ChallengeCreate />} />
          <Route path="challenges/:id" element={<ChallengeDetail />} />
          <Route path="challenges/:id/apply" element={<SubmitProposal />} />
          <Route path="challenges" element={<ChallengesList />} />
          <Route path="applications/:id/evaluate" element={<EvaluationScreen />} />
          <Route path="startups" element={<StartupDiscovery />} />
          <Route path="applications" element={<ApplicationsList />} />
          <Route path="pilots/:id" element={<PilotDetail />} />
          <Route path="pilots" element={<PilotsList />} />
          <Route path="track-record" element={<TrackRecordLedger />} />
          <Route path="kpi" element={<KPIPerformance />} />
          <Route path="decisions" element={<Decisions />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="notifications" element={<NotificationsList />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="documents" element={<Documents />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
