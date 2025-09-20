import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import SEO from './components/SEO';

// SEO Wrapper Component
const AppWithSEO: React.FC = () => {
  const location = useLocation();

  // Define SEO data for each route
  const getSEOData = (pathname: string) => {
    const baseUrl = 'https://careerforge.ai';

    switch (pathname) {
      case '/':
        return {
          title: 'CareerForge.ai - AI-Powered Career Planning & Skill Development Platform',
          description: 'Transform your career with AI-powered planning tools. Get personalized roadmaps, skill gap analysis, AI resume builder, and expert career guidance. Start your journey to success today.',
          keywords: 'career planning, AI career guidance, skill development, resume builder, career roadmap, professional development, job search, career coaching, skill assessment',
          url: `${baseUrl}/`,
          image: `${baseUrl}/og-image.jpg`
        };

      case '/login':
        return {
          title: 'Login - CareerForge.ai',
          description: 'Sign in to your CareerForge.ai account to access your personalized career dashboard, resume builder, and AI-powered career guidance.',
          keywords: 'login, sign in, career account, professional dashboard',
          url: `${baseUrl}/login`
        };

      case '/register':
        return {
          title: 'Join CareerForge.ai - Start Your AI-Powered Career Journey',
          description: 'Create your free account and begin your personalized career transformation with AI-powered tools, skill assessments, and professional development guidance.',
          keywords: 'register, sign up, free account, career planning, AI tools',
          url: `${baseUrl}/register`
        };

      case '/resume':
        return {
          title: 'AI Resume Builder - CareerForge.ai',
          description: 'Create professional resumes with AI assistance. Our intelligent resume builder analyzes your skills and experience to create optimized resumes for your target industry.',
          keywords: 'resume builder, AI resume, professional resume, CV builder, resume optimization',
          url: `${baseUrl}/resume`
        };

      case '/dashboard':
        return {
          title: 'Career Dashboard - Track Your Professional Growth | CareerForge.ai',
          description: 'Monitor your career progress with our comprehensive dashboard. Track skills, goals, and milestones in your personalized career development journey.',
          keywords: 'career dashboard, progress tracking, skill development, career goals, professional growth',
          url: `${baseUrl}/dashboard`
        };

      case '/roadmaps':
        return {
          title: 'Personalized Career Roadmaps - AI-Powered Planning | CareerForge.ai',
          description: 'Get customized career roadmaps tailored to your goals and skills. Our AI analyzes your profile to create step-by-step career development plans.',
          keywords: 'career roadmap, career planning, AI guidance, professional development, career path',
          url: `${baseUrl}/roadmaps`
        };

      case '/skills':
        return {
          title: 'Skill Assessment & Development Platform | CareerForge.ai',
          description: 'Assess your current skills and identify gaps for career advancement. Get personalized recommendations for skill development and training.',
          keywords: 'skill assessment, skill gap analysis, skill development, training recommendations, career skills',
          url: `${baseUrl}/skills`
        };

      case '/goals':
        return {
          title: 'Set & Track Career Goals - Goal Management | CareerForge.ai',
          description: 'Define and track your professional goals with our goal management system. Get AI-powered insights and recommendations to achieve your career objectives.',
          keywords: 'career goals, goal setting, goal tracking, professional objectives, career planning',
          url: `${baseUrl}/goals`
        };

      case '/job-search':
        return {
          title: 'AI-Powered Job Search - Find Your Dream Career | CareerForge.ai',
          description: 'Discover job opportunities that match your skills and career goals. Our AI-powered job search helps you find relevant positions and tracks your applications.',
          keywords: 'job search, career opportunities, job matching, AI job search, employment',
          url: `${baseUrl}/job-search`
        };

      case '/faq':
        return {
          title: 'Frequently Asked Questions - CareerForge.ai Support',
          description: 'Find answers to common questions about CareerForge.ai features, pricing, and how to make the most of our AI-powered career planning platform.',
          keywords: 'FAQ, help, support, questions, career planning help',
          url: `${baseUrl}/faq`
        };

      case '/guides':
        return {
          title: 'Career Guides & Resources - Professional Development | CareerForge.ai',
          description: 'Access comprehensive career guides, industry insights, and professional development resources to accelerate your career growth.',
          keywords: 'career guides, professional development, industry insights, career resources, career advice',
          url: `${baseUrl}/guides`
        };

      case '/support':
        return {
          title: 'Contact Support - CareerForge.ai Help Center',
          description: 'Need help with CareerForge.ai? Contact our support team for assistance with your account, features, or technical issues.',
          keywords: 'support, help, contact, customer service, technical support',
          url: `${baseUrl}/support`
        };

      default:
        return {
          title: 'CareerForge.ai - AI-Powered Career Planning & Skill Development Platform',
          description: 'Transform your career with AI-powered planning tools. Get personalized roadmaps, skill gap analysis, AI resume builder, and expert career guidance.',
          keywords: 'career planning, AI career guidance, skill development, resume builder, career roadmap',
          url: `${baseUrl}${pathname}`
        };
    }
  };

  const seoData = getSEOData(location.pathname);

  return (
    <>
      <SEO {...seoData} />
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
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWithSEO />
      </AuthProvider>
    </Router>
  );
}

export default App;
