import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  FaChartLine, FaSync, FaTasks,
  FaPlus, FaSpinner, FaCheckCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';


import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  reset, createGoal, getUserDashboard, selectDashboardStats, selectUserSkills, selectCareerGoals, getAIRecommendations, selectAIRecommendations
} from './dashboardSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CareerGoal } from './types';
import GoalDetails from './components/GoalDetails';
import { useAuth } from '../../context/AuthContext';

// Types for dashboard components
interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDashboardStats);
  const skills = useAppSelector(selectUserSkills);
  const recommendations = useAppSelector(selectAIRecommendations);
  useAppSelector(selectCareerGoals);
  const isLoading = useAppSelector((state) => state.dashboard.isLoading);
  const isError = useAppSelector((state) => state.dashboard.isError);
  const message = useAppSelector((state) => state.dashboard.message);
  const { user } = useAuth();
  console.log("User object in Dashboard.tsx:", user);
  
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showGoalDetailsModal, setShowGoalDetailsModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal | null>(null);
  const [newGoalFormData, setNewGoalFormData] = useState({
    title: '',
    description: '',
    targetDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'active' as 'active' | 'completed' | 'paused',
  });

  useEffect(() => {
    if (user?.id) {
      console.log('Dashboard: User authenticated, dispatching API calls');
      dispatch(getUserDashboard());
      dispatch(getAIRecommendations());
    } else {
      console.log('Dashboard: No user authenticated, skipping API calls');
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  // Data generators for charts and cards, using real data from the API
  const generateMetricCards = (): MetricCard[] => {
    console.log('Dashboard: Generating metric cards with stats:', stats);
    if (!stats) {
      console.log('Dashboard: No stats available for metric cards');
      return [];
    }
    return [
      {
        id: 'total-skills',
        title: 'Total Skills',
        value: stats.total_skills,
        icon: <FaTasks className="text-xl" />,
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'completed-skills',
        title: 'Completed Skills',
        value: stats.completed_skills,
        icon: <FaCheckCircle className="text-xl" />,
        color: 'from-green-500 to-green-600'
      },
      {
        id: 'pending-skills',
        title: 'Pending Skills',
        value: stats.pending_skills,
        icon: <FaSpinner className="text-xl" />,
        color: 'from-yellow-500 to-yellow-600'
      },
      {
        id: 'progress-percent',
        title: 'Overall Progress',
        value: `${stats.progress_percent.toFixed(1)}%`,
        icon: <FaChartLine className="text-xl" />,
        color: 'from-purple-500 to-purple-600'
      }
    ];
  };

  const generateSkillStatusData = () => {
    if (!stats) return [];
    return [
      { name: 'Not Started', value: stats.not_started_skills, color: '#6B7280' },
      { name: 'Pending', value: stats.pending_skills, color: '#F59E0B' },
      { name: 'Completed', value: stats.completed_skills, color: '#10B981' },
    ];
  };

  const handleRefresh = () => {
    if (user?.id) {
      dispatch(getUserDashboard());
    }
  };

  const handleAddGoalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This part remains for a separate feature, assuming it's still needed
    const resultAction = await dispatch(createGoal(newGoalFormData));
    if (createGoal.fulfilled.match(resultAction)) {
      const newGoal = resultAction.payload;
      setSelectedGoal(newGoal);
      setShowGoalDetailsModal(true);
    }
    setShowAddGoalModal(false);
    setNewGoalFormData({
      title: '',
      description: '',
      targetDate: '',
      priority: 'medium',
      status: 'active',
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const metricCards = generateMetricCards();
  const skillStatusData = generateSkillStatusData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-2">
              Learning Dashboard
            </h1>
            <p className="text-gray-300">Track your progress and achieve your career goals</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <button 
              onClick={handleRefresh}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FaSync className="mr-2" />
              Refresh
            </button>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FaPlus className="mr-2" />
              Add Goal
            </button>
            <Link to="/roadmaps" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              View All Roadmaps
            </Link>
          </div>
        </div>
        
        {isError && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
            {message || 'Error loading dashboard data.'}
          </div>
        )}

        {/* Key Metrics Cards - Now driven by real API data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricCards.map((metric) => (
            <div
              key={metric.id}
              className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6 overflow-hidden group hover:bg-opacity-10 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                    {metric.icon}
                  </div>
                </div>
<h3 className="text-sm font-medium text-gray-800 mb-1">{metric.title}</h3>
<p className="text-2xl font-bold text-black">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Row - Now showing correct data */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-black">
          {/* Skills by Status Chart */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">Skills by Status</h2>
              <div className="text-sm text-gray-800">Current breakdown</div>
            </div>
            <div className="h-64 flex items-center justify-center">
              {stats && stats.total_skills > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {skillStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
<p className="text-gray-800">No skill data to display. Start a roadmap to see your progress.</p>
              )}
            </div>
          </div>

          {/* Skills List */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-black">Your Skills</h2>
              <div className="text-sm text-gray-800">Top 5</div>
            </div>
            <div className="space-y-3">
              {skills && skills.length > 0 ? (
                skills.slice(0, 5).map(skill => (
                  <div key={skill.skill_id} className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
                    <h3 className="font-medium text-black">{skill.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${{
                      'completed': 'bg-green-500 text-green-100',
                      'pending': 'bg-yellow-500 text-yellow-100',
                      'not_started': 'bg-gray-500 text-gray-100'
                    }[skill.status]}`}>
                      {skill.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-800">No skills found. Add skills in your roadmap.</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Topics */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Upcoming Topics</h2>
          <div className="space-y-3">
            {skills && skills.filter(skill => skill.status === 'pending').slice(0, 5).map(skill => (
              <div key={skill.skill_id} className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
                <h3 className="font-medium text-black">{skill.name}</h3>
                <span className="text-xs text-gray-800">{skill.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">AI Recommendations</h2>
          <div className="space-y-3">
            {recommendations && recommendations.length > 0 ? (
              recommendations.slice(0, 5).map(rec => (
                <div key={rec.id} className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
                  <h3 className="font-medium text-black">{rec.title}</h3>
                  <span className="text-xs text-gray-800">{rec.type}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-800">No AI recommendations available.</p>
            )}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">AI Insights</h2>
          <p className="text-gray-800">
            Based on your progress, you are doing great! Keep up the good work. Focus on completing your pending skills to achieve your goals faster.
          </p>
        </div>

        {/* Time Spent Chart (Placeholder) */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Time Spent (Placeholder)</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Learning', value: 70, color: '#8884d8' },
                    { name: 'Practice', value: 30, color: '#82ca9d' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    { name: 'Learning', value: 70, color: '#8884d8' },
                    { name: 'Practice', value: 30, color: '#82ca9d' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Add Goal Modal and other features can remain if they are separate concerns */}
        {showAddGoalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-6">Add New Goal</h3>
              <form onSubmit={handleAddGoalSubmit}>
                {/* Form content remains the same */}
              </form>
            </div>
          </div>
        )}

        {selectedGoal && showGoalDetailsModal && (
          <GoalDetails goal={selectedGoal} onClose={() => setShowGoalDetailsModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;