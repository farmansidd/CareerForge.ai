import React, { useState } from 'react';
import { FaLightbulb, FaCheck, FaTimes, FaPlus, FaExternalLinkAlt } from 'react-icons/fa';
import { AIRecommendation } from '../types';

interface AIRecommendationsSectionProps {
  recommendations: AIRecommendation[];
  onAcceptRecommendation: (id: string) => void;
  onIgnoreRecommendation: (id: string) => void;
  onCompleteRecommendation: (id: string) => void;
}

const AIRecommendationsSection: React.FC<AIRecommendationsSectionProps> = ({
  recommendations = [],
  onAcceptRecommendation,
  onIgnoreRecommendation,
  onCompleteRecommendation,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    return rec.status === filter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-blue-400';
      case 'certification': return 'text-green-400';
      case 'job_role': return 'text-purple-400';
      case 'skill': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-white border-opacity-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
        <div className="flex space-x-2">
          {(['all', 'pending', 'accepted', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-sm ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecommendations.map((rec) => (
          <div key={rec.id} className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <FaLightbulb className={`mr-2 ${getTypeColor(rec.type)}`} />
                <h3 className="font-semibold text-white">{rec.title}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(rec.difficulty)} bg-gray-700`}>
                {rec.difficulty}
              </span>
            </div>

            <p className="text-sm text-gray-300 mb-3">{rec.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className={getTypeColor(rec.type)}>{rec.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Relevance:</span>
                <span className="text-indigo-400">{rec.relevance}%</span>
              </div>
              {rec.estimatedTime && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Time:</span>
                  <span className="text-green-400">{rec.estimatedTime}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mt-4">
              {rec.status === 'pending' && (
                <>
                  <button
                    onClick={() => onAcceptRecommendation(rec.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm"
                  >
                    <FaCheck className="inline mr-1" /> Accept
                  </button>
                  <button
                    onClick={() => onIgnoreRecommendation(rec.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
                  >
                    <FaTimes className="inline mr-1" /> Ignore
                  </button>
                </>
              )}
              {rec.actionUrl && (
                <a
                  href={rec.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm text-center"
                >
                  <FaExternalLinkAlt className="inline mr-1" /> View
                </a>
              )}
              {rec.status === 'accepted' && (
                <button
                  onClick={() => onCompleteRecommendation(rec.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded text-sm"
                >
                  <FaCheck className="inline mr-1" /> Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8">
          <FaLightbulb className="text-4xl text-gray-400 mb-4 mx-auto" />
          <p className="text-gray-400 mb-4">No recommendations available. Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsSection;
