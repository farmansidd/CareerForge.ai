import React from 'react';

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Q: How do I create a new resume?</h2>
            <p className="text-gray-300">A: Navigate to the "Resume Builder" section from the main navigation. You can then fill in your personal information, experience, education, and other details. The live preview will show you how your resume looks as you build it.</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Q: Can I track my learning progress?</h2>
            <p className="text-gray-300">A: Yes, visit the "Road Maps" section to see your learning roadmap, track pending and completed skills, and monitor your overall progress.</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Q: Where can I find job listings?</h2>
            <p className="text-gray-300">A: The "Job Search" section allows you to search for jobs from various sources. You can use the search and filter options to find relevant positions.</p>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Q: How do I contact support?</h2>
            <p className="text-gray-300">A: You can reach our support team through the "Contact Support" link under "Help & Resources" in the navigation bar. Fill out the form, and we'll get back to you as soon as possible.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
