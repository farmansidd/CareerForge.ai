import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoadmapStore } from '../../store/roadmapStore'; // Import the store
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import { Roadmap } from '../../types';

interface RoadmapGeneratorFormProps {
  onRoadmapGenerated?: (newRoadmap: Roadmap) => void; // Make prop optional
}

const RoadmapGeneratorForm: React.FC<RoadmapGeneratorFormProps> = ({ onRoadmapGenerated }) => {
  const [goal, setGoal] = useState('');
  const { generateRoadmap, loading, error: storeError } = useRoadmapStore(); // Get state and actions
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!goal.trim()) {
      setError('Please enter your goal.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to generate a roadmap.');
      navigate('/login');
      return;
    }

    const newRoadmap = await generateRoadmap(goal);

    console.log("Generated Roadmap:", newRoadmap);

    if (newRoadmap) {
      if (onRoadmapGenerated) {
        onRoadmapGenerated(newRoadmap);
      } else {
        navigate(`/roadmaps/${newRoadmap.id}`);
      }
    } else {
      setError(storeError || 'Failed to generate roadmap. Please try again.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Generate Your Learning Roadmap</h2>
      <p className="text-gray-300 mb-6 text-center">Tell us what you want to achieve, and our AI will craft a personalized learning path for you.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="goal" className="block text-gray-300 text-sm font-bold mb-2">
            What do you want to become or achieve?
          </label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., 'Become a Full-Stack Web Developer' or 'Master Data Science'"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
            disabled={loading}
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <Button
          type="submit"
          loading={loading}
          disabled={loading || !goal.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          {loading ? 'Generating Roadmap...' : 'Generate My Roadmap'}
        </Button>
      </form>
    </div>
  );
};

export default RoadmapGeneratorForm;