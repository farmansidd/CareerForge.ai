import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector'; // Import the new component

import CertificationsForm from './CertificationsForm';
import ProjectsForm from './ProjectsForm';

const ResumeBuilder: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'editor' | 'templates'>('editor');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('classic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6 bg-animate">
      
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2 shadow-2xl flex justify-center">
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentTab('editor')}
              className={`py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                currentTab === 'editor'
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-white/10 hover:text-gray-900'
              }`}
            >
              📝 Resume Editor
            </button>
            <button
              onClick={() => setCurrentTab('templates')}
              className={`py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                currentTab === 'templates'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-white/10 hover:text-gray-900'
              }`}
            >
              🎨 Template Gallery
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {currentTab === 'editor' ? (
          // Original Resume Editor
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Resume Editor</h2>
              <PersonalInfoForm />
              <SummaryForm />
              <ExperienceForm />
              <ProjectsForm />
              <EducationForm />
              <CertificationsForm />
              <SkillsForm />
            </div>

            {/* Right Column: Preview */}
            <div className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Live Preview</h2>
              <div className="sticky top-8">
                <ResumePreview />
              </div>
            </div>

          </div>
        ) : (
          // Template Gallery
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            setSelectedTemplateId={setSelectedTemplateId}
            setCurrentTab={setCurrentTab}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;