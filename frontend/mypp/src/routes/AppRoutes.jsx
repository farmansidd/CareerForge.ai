import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Dashboard from '../features/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import FAQPage from '../pages/FAQPage';
import GuidesPage from '../pages/GuidesPage';
import ContactSupportPage from '../pages/ContactSupportPage';
import SendFeedbackPage from '../pages/SendFeedbackPage';
import LandingPage from '../pages/LandingPage';
import JobSearchPage from '../pages/JobSearchPage';
import ResumeBuilder from '../features/resume/ResumeBuilder';
import RoadmapPage from '../features/Roadmap/Roadmap';
import RoadmapGeneratorForm from '../features/Roadmap/RoadmapGeneratorForm.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route path="/job-search" element={<JobSearchPage />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/resume" element={<ResumeBuilder />} />
      <Route path="/roadmaps" element={<RoadmapPage />} />
      <Route path="/roadmaps/:roadmapId" element={<RoadmapPage />} />
      <Route path="/roadmaps/generate-new" element={<RoadmapGeneratorForm />} />

      <Route path="/faq" element={<FAQPage />} />
      <Route path="/guides" element={<GuidesPage />} />
      <Route path="/support" element={<ContactSupportPage />} />
      <Route path="/feedback" element={<SendFeedbackPage />} />

      {/* You can protect more routes like this */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}