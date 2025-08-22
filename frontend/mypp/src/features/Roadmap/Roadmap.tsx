import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRoadmapStore } from '../../store/roadmapStore';
import {
  CheckSquare,
  Square,
  Bot,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  X,
  Send,
  User,
  CheckCircle2,
  Circle,
  BookOpen,
  Star
} from 'lucide-react';
import RoadmapGeneratorForm from './RoadmapGeneratorForm'; // Import the new form component
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming you have a LoadingSpinner component
import { Roadmap } from '../../types';

import { updateSkillStatus } from '../../services/api';

// Redux imports for AI chat
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sendMessage as sendAIChatMessage, addMessage, clearConversation } from '../../features/ai/aiSlice';
import { AIMessage } from '../../features/ai/aiTypes';


const RoadmapPage: React.FC = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>();
  const navigate = useNavigate();
  const {
    roadmaps,
    loading,
    error,
    fetchRoadmaps,
  } = useRoadmapStore();

  const dispatch = useAppDispatch();
  const { messages: aiChatMessages, loading: aiChatLoading, error: aiChatError } = useAppSelector((state) => state.ai);

  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<AIMessage[]>([]); // Initialize with empty array, will be populated from Redux
  const [newMessage, setNewMessage] = useState('');
  const [pendingSkills, setPendingSkills] = useState([]);
  const [completedSkills, setCompletedSkills] = useState([]);

  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | undefined>(undefined);

  useEffect(() => {
    if (roadmaps.length > 0 && roadmapId) {
      const foundRoadmap = roadmaps.find((r) => r.id === Number(roadmapId));
      setCurrentRoadmap(foundRoadmap);
    }
  }, [roadmaps, roadmapId]);

  useEffect(() => {
    fetchRoadmaps();
  }, [fetchRoadmaps]);

  useEffect(() => {
    if (currentRoadmap) {
      setPendingSkills(currentRoadmap.topics.flatMap(topic => topic.subtopics.flatMap(subtopic => subtopic.skills.map(skill => ({...skill, category: topic.name, estimatedTime: '1 week'})))));
      setCompletedSkills([]);
    }
  }, [currentRoadmap]);

  // Sync Redux AI chat messages with local state for display
  useEffect(() => {
    setChatMessages(aiChatMessages);
  }, [aiChatMessages]);

  const handleRoadmapGenerated = (newRoadmap: Roadmap) => {
    useRoadmapStore.setState(state => ({ roadmaps: [...state.roadmaps, newRoadmap] }));
    navigate(`/roadmaps/${newRoadmap.id}`);
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      // Add user message to Redux store
      dispatch(addMessage({ 
        id: Date.now().toString(), 
        role: 'user', 
        content: newMessage,
        timestamp: new Date().toISOString()
      }));
      
      // Dispatch AI chat message to backend
      await dispatch(sendAIChatMessage(newMessage));
      
      setNewMessage('');
    }
  };

  const moveSkillToCompleted = async (skillId: number) => {
    try {
      await updateSkillStatus(skillId, 'complete');
      const skill = pendingSkills.find(s => s.id === skillId);
      if (skill) {
        setCompletedSkills([...completedSkills, skill]);
        setPendingSkills(pendingSkills.filter(s => s.id !== skillId));
      }
    } catch (error) {
      console.error("Failed to update skill status", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-400 text-center p-4">{error}</div>;
  }

  if (!roadmapId || !currentRoadmap) {
    if (roadmaps.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
          <RoadmapGeneratorForm onRoadmapGenerated={handleRoadmapGenerated} />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Learning Roadmaps</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.map((roadmap) => (
                <Link key={roadmap.id} to={`/roadmaps/${roadmap.id}`} className="block">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl hover:bg-white/20 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-white mb-2">{roadmap.title}</h2>
                    <p className="text-blue-200 text-lg">{roadmap.description}</p>
                    <div className="mt-4 text-right">
                      <span className="text-blue-300 hover:text-blue-100 transition-colors">View Roadmap &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/roadmaps/generate-new')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Generate New Roadmap
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  const completionRate = currentRoadmap && pendingSkills.length + completedSkills.length > 0 ? (completedSkills.length / (pendingSkills.length + completedSkills.length)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{currentRoadmap.title}</h1>
              <p className="text-blue-200">{currentRoadmap.description}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Handle start learning
                }}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Start Learning
              </button>
              <button
                onClick={() => setShowChatbot(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Bot className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-2xl font-bold text-white">{pendingSkills.length}</p>
                <p className="text-blue-200 text-sm">Pending Skills</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{completedSkills.length}</p>
                <p className="text-blue-200 text-sm">Completed Skills</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">{completionRate.toFixed(0)}%</p>
                <p className="text-blue-200 text-sm">Completion Rate</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-blue-200 text-sm">Week Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Skills */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-cyan-400" />
              Pending Skills ({pendingSkills.length})
            </h2>
            <div className="space-y-4">
              {pendingSkills.map((skill) => (
                <div key={skill.id} className="group backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => moveSkillToCompleted(skill.id)}
                      className="text-blue-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                      <Square className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{skill.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs px-2 py-1 bg-blue-500/30 text-blue-200 rounded-full">
                          {skill.category}
                        </span>
                        <span className="text-xs text-blue-300 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {skill.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Skills */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-green-400" />
              Completed Skills ({completedSkills.length})
            </h2>
            <div className="space-y-4">
              {completedSkills.map((skill) => (
                <div key={skill.id} className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <h3 className="text-white font-medium line-through opacity-75">{skill.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs px-2 py-1 bg-green-500/30 text-green-200 rounded-full">
                          {skill.category}
                        </span>
                        <span className="text-xs text-green-300 flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chatbot Modal */}
        {showChatbot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowChatbot(false)}></div>
            <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 w-full max-w-md h-96 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">AI Learning Assistant</h3>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'backdrop-blur-sm bg-white/10 text-white border border-white/20'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {msg.role === 'assistant' && <Bot className="w-4 h-4 mt-0.5 text-cyan-400" />}
                        {msg.role === 'user' && <User className="w-4 h-4 mt-0.5" />}
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask about your learning path..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-2 rounded-lg transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;