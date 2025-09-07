import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import RoadmapPage from './features/Roadmap/Roadmap';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Goals from './pages/Goals';
import Admin from './pages/Admin';
import JobSearchPage from './pages/JobSearchPage';
import FAQPage from './pages/FAQPage';
import GuidesPage from './pages/GuidesPage';
import ContactSupportPage from './pages/ContactSupportPage';
import SendFeedbackPage from './pages/SendFeedbackPage';
import RoadmapGeneratorForm from './features/Roadmap/RoadmapGeneratorForm';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Private Routes */}
            <Route path="/resume" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/roadmaps" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="/roadmaps/:roadmapId" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
            <Route path="/roadmaps/generate-new" element={<ProtectedRoute><RoadmapGeneratorForm /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/job-search" element={<ProtectedRoute><JobSearchPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/support" element={<ContactSupportPage />} />
            <Route path="/feedback" element={<SendFeedbackPage />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
