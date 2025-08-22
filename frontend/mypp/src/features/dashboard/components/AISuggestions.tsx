import React from 'react';
import { AIRecommendation } from '../../dashboard/types';
import { FaLightbulb, FaBook, FaCertificate, FaBriefcase, FaCodeBranch } from 'react-icons/fa';

interface AISuggestionsProps {
  recommendations: AIRecommendation[];
}

const getIconForType = (type: AIRecommendation['type']) => {
  switch (type) {
    case 'course':
      return <FaBook className="text-blue-400" />;
    case 'certification':
      return <FaCertificate className="text-green-400" />;
    case 'job_role':
      return <FaBriefcase className="text-purple-400" />;
    case 'skill':
      return <FaCodeBranch className="text-yellow-400" />;
    default:
      return <FaLightbulb className="text-gray-400" />;
  }
};

const AISuggestions: React.FC<AISuggestionsProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 p-6 shadow-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">AI-Powered Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white bg-opacity-5 p-4 rounded-lg border border-white border-opacity-10">
            <div className="flex items-center mb-2">
              <div className="mr-3">{getIconForType(rec.type)}</div>
              <h3 className="font-semibold text-white">{rec.title}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-2">{rec.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Relevance: {rec.relevance}%</span>
              {rec.actionUrl && (
                <a href={rec.actionUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-100 transition">
                  Learn More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;
