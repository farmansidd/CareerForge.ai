import { useState } from 'react';
import axios from 'axios';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    experience: '',
    skills: '',
    education: ''
  });
  const [resumeContent, setResumeContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    if (!formData.jobTitle || !formData.experience) {
      setError('Job title and experience are required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/resume/generate', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setResumeContent(response.data.content);
    } catch (err) {
      setError('Failed to generate resume. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">AI Resume Builder</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Target Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. Software Engineer"
              />
            </div>
            
            <div>
              <label className="block mb-1">Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="Describe your work experience..."
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border rounded"
                placeholder="List your key skills..."
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Education</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border rounded"
                placeholder="Your educational background..."
              ></textarea>
            </div>
            
            <button
              onClick={generateResume}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate Resume'}
            </button>
            
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Generated Resume</h2>
          <div className="bg-white border rounded p-4 min-h-[300px]">
            {resumeContent ? (
              <div className="whitespace-pre-wrap">{resumeContent}</div>
            ) : (
              <p className="text-gray-500">
                {isLoading 
                  ? 'AI is crafting your professional resume...' 
                  : 'Your resume will appear here after generation'}
              </p>
            )}
          </div>
          
          {resumeContent && (
            <div className="mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded mr-2">
                Download PDF
              </button>
              <button className="border px-4 py-2 rounded">
                Save to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}