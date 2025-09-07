
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const TemplateSelector: React.FC<{ selectedTemplateId: string; setSelectedTemplateId: (id: string) => void; setCurrentTab: (tab: 'editor' | 'templates') => void }> = ({ selectedTemplateId, setSelectedTemplateId, setCurrentTab }) => {
  const resume = useAppSelector((state) => state.resume);

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'A clean and modern template.',
      component: ModernTemplate
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'A classic and elegant template.',
      component: ClassicTemplate
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A creative and visually appealing template.',
      component: CreativeTemplate
    }
  ];

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplateId)?.component || ModernTemplate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Resume Template Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professional resume templates. Each template is designed 
            to highlight your experience and skills in a unique, professional way.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Select Your Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedTemplateId === template.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
                  <p className="text-xs text-gray-600">{template.description}</p>
                  {selectedTemplateId === template.id && (
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Preview</h2>
            <div className="flex gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Download PDF
              </button>
              <button 
                onClick={() => {
                  setSelectedTemplateId(selectedTemplateId);
                  setCurrentTab('editor');
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
          
          <div className="overflow-auto max-h-[800px] border rounded-lg">
            <div className="min-w-[800px]">
              <SelectedTemplateComponent resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
