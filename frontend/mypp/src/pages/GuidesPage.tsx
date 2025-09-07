import React from 'react';

const GuidesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Guides & Tutorials</h1>
        
        <div className="space-y-6">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Getting Started with CareerForge.ai</h2>
            <p className="text-gray-300">Learn the basics of navigating the platform, setting up your profile, and understanding the core features.</p>
            <a href="#!" className="text-blue-400 hover:underline mt-2 block">Read Guide</a>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Mastering the Resume Builder</h2>
            <p className="text-gray-300">A comprehensive guide to using all features of the resume builder, including advanced tips for optimizing your resume for ATS.</p>
            <a href="#!" className="text-blue-400 hover:underline mt-2 block">Watch Tutorial</a>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Effective Job Search Strategies</h2>
            <p className="text-gray-300">Discover strategies for finding the right job opportunities using our Job Search feature, tailoring your applications, and preparing for interviews.</p>
            <a href="#!" className="text-blue-400 hover:underline mt-2 block">Download E-book</a>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Personalized Learning Roadmaps</h2>
            <p className="text-gray-300">Understand how to create and utilize personalized learning roadmaps to acquire new skills and advance your career.</p>
            <a href="#!" className="text-blue-400 hover:underline mt-2 block">Explore More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
