import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';

import ResumeBuilderPage from './pages/ResumeBuilderPage';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import RoadmapPage from './features/Roadmap/Roadmap';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/resume" element={<ResumeBuilderPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/roadmap/:roadmapId" element={<RoadmapPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;