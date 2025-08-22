import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateResumeContent, addSection, updateSection, removeSection, setTemplate } from './resumeSlice';
import { ResumeSection } from './resumeTypes';
import Button from './../../components/Button';
import LoadingSpinner from './../../components/LoadingSpinner';
import SectionEditor from './SectionEditor';

const ResumeBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sections, generatedContent, loading, template } = useAppSelector((state) => state.aiResume);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleAddSection = (type: ResumeSection['type']) => {
    const newSection: ResumeSection = {
      id: Date.now().toString(),
      type,
      content: '',
    };
    dispatch(addSection(newSection));
    setActiveSection(newSection.id);
  };

  const handleGenerate = async () => {
    if (sections.length === 0) return;
    await dispatch(generateResumeContent());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Resume Builder</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Resume Sections</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Button onClick={() => handleAddSection('summary')}>Add Summary</Button>
              <Button onClick={() => handleAddSection('experience')}>Add Experience</Button>
              <Button onClick={() => handleAddSection('education')}>Add Education</Button>
              <Button onClick={() => handleAddSection('skills')}>Add Skills</Button>
            </div>

            <div className="space-y-4">
              {sections.map((section) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onActivate={() => setActiveSection(section.id)}
                  onUpdate={(content) => dispatch(updateSection({ id: section.id, content }))}
                  onRemove={() => dispatch(removeSection(section.id))}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Template</h2>
            <div className="flex gap-4">
              {(['professional', 'modern', 'creative'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => dispatch(setTemplate(t))}
                  className={`px-4 py-2 rounded capitalize ${
                    template === t
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || sections.length === 0}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Generate Resume'}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          {loading ? (
            <LoadingSpinner />
          ) : generatedContent ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: generatedContent }}
            />
          ) : (
            <div className="text-gray-500 text-center py-12">
              {sections.length === 0
                ? 'Add sections to build your resume'
                : 'Click "Generate Resume" to see the result'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;