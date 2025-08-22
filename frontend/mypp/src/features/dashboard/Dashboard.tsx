import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  FaBook, FaBullseye, FaChartLine, FaLightbulb, FaSync, FaTasks, 
  FaUserGraduate, FaCalendarCheck, FaTrophy, FaGraduationCap, 
  FaPlus,  FaStar,    
  FaCalendarAlt  
} from 'react-icons/fa';
import { FaFire, FaClock,  FaChevronRight, FaAward } from 'react-icons/fa6';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  getDashboardStats, reset, setMockStats, getGoals, getSkills, 
  createGoal, getAIRecommendations
} from './dashboardSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CareerGoal, Skill, GoalStep, AIRecommendation } from './types';
import GoalDetails from './components/GoalDetails';
import AISuggestions from './components/AISuggestions';

// Types for dashboard components
interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  trend: number;
  icon: React.ReactNode;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
}

interface UpcomingDeadline {
  id: string;
  title: string;
  type: 'goal' | 'task';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface ActivityData {
  date: string;
  activities: number;
  goals: number;
  skills: number;
}

interface SkillProficiencyData {
  name: string;
  proficiency: number;
  category: string;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    stats, goals, skills, isLoading, isError, message, recommendations
  } = useAppSelector((state) => state.dashboard);
  
  const [activeTimeRange, setActiveTimeRange] = useState<'week' | 'month' | 'quarter'>('week');
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
    dispatch(getDashboardStats())
      .unwrap()
      .catch(() => dispatch(setMockStats()));
      
    dispatch(getGoals({}));
    dispatch(getAIRecommendations());
      
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Mock data generators
  const generateMetricCards = (): MetricCard[] => [
    {
      id: 'total-goals',
      title: 'Total Goals',
      value: stats?.total_goals || 0,
      trend: 12,
      icon: <FaBullseye className="text-xl" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'completed-goals',
      title: 'Completed Goals',
      value: stats?.goals_completed || 0,
      trend: 8,
      icon: <FaTrophy className="text-xl" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'skills-progress',
      title: 'Skills in Progress',
      value: skills.filter(skill => skill.mastery < 100).length,
      trend: 5,
      icon: <FaGraduationCap className="text-xl" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'learning-streak',
      title: 'Learning Streak',
      value: `${stats?.learning_streak || 0} days`,
      trend: 20,
      icon: <FaFire className="text-xl" />,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'career-readiness',
      title: 'Career Readiness',
      value: `${stats?.career_readiness || 0}%`,
      trend: 10,
      icon: <FaUserGraduate className="text-xl" />,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const generateAchievements = (): Achievement[] => [
    
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: '7-day learning streak',
      icon: <FaFire />,
      unlocked: (stats?.learning_streak || 0) >= 7
    },
    {
      id: 'skill-collector',
      title: 'Skill Collector',
      description: 'Acquired 5 skills',
      icon: <FaStar />,
      unlocked: (stats?.skills_acquired || 0) >= 5
    }
  ];

  const generateUpcomingDeadlines = (): UpcomingDeadline[] => {
    const deadlines: UpcomingDeadline[] = [];
    
    // Add goals with upcoming deadlines
    goals.forEach(goal => {
      if (goal.status === 'active' && new Date(goal.targetDate) > new Date()) {
        deadlines.push({
          id: goal.id,
          title: goal.title,
          type: 'goal',
          dueDate: goal.targetDate,
          priority: goal.priority
        });
      }
    });

    return deadlines
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
  };

  const generateActivityData = (): ActivityData[] => {
    const data: ActivityData[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        activities: Math.floor(Math.random() * 10) + 5,
        goals: Math.floor(Math.random() * 3) + 1,
        skills: Math.floor(Math.random() * 5) + 2
      });
    }
    
    return data;
  };

  const generateSkillProficiencyData = (): SkillProficiencyData[] => {
    return skills.slice(0, 8).map(skill => ({
      name: skill.name,
      proficiency: skill.mastery,
      category: skill.category || 'General'
    }));
  };

  const generateProgressData = () => {
    const completedGoals = stats?.goals_completed || 0;
    const totalGoals = stats?.total_goals || 1;
    const inProgressGoals = totalGoals - completedGoals;
    
    return [
      { name: 'Completed', value: completedGoals, color: '#10B981' },
      { name: 'In Progress', value: inProgressGoals, color: '#F59E0B' },
    ];
  };

  const handleRefresh = () => {
    dispatch(getDashboardStats()).unwrap().catch(() => dispatch(setMockStats()));
    dispatch(getGoals({}));
    dispatch(getSkills({}));
    dispatch(getAIRecommendations());
  };

  const handleAddGoalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    dispatch(getGoals({}));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const metricCards = generateMetricCards();
  const achievements = generateAchievements();
  const upcomingDeadlines = generateUpcomingDeadlines();
  const activityData = generateActivityData();
  const skillProficiencyData = generateSkillProficiencyData();
  const progressData = generateProgressData();

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
          </div>
        </div>
        
        {isError && (
          <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
            {message || 'Error loading dashboard data. Using mock data.'}
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {metricCards.map((metric) => (
            <div
              key={metric.id}
              className="relative bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6 overflow-hidden group hover:bg-opacity-10 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color} bg-opacity-20`}>
                    {metric.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400 flex items-center">
                      +{metric.trend}% <FaChartLine className="ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-300 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Overview Chart */}
          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Goals Progress</h2>
              <div className="text-sm text-gray-400">Overall completion</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Proficiency Chart */}
          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Skills Proficiency</h2>
              <div className="text-sm text-gray-400">Mastery levels</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillProficiencyData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" width={80} stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="proficiency" fill="url(#skillGradient)" radius={[0, 4, 4, 0]} />
                  <defs>
                    <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Trends and Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Trends Chart */}
          <div className="lg:col-span-2 bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Activity Trends</h2>
              <div className="flex space-x-2">
                {(['week', 'month', 'quarter'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setActiveTimeRange(range)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                      activeTimeRange === range 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="activities"
                    stackId="1"
                    stroke="#8B5CF6"
                    fill="url(#activityGradient)"
                  />
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowAddGoalModal(true)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
              >
                <div className="flex items-center">
                  <FaBullseye className="mr-3" />
                  <span>Add New Goal</span>
                </div>
                <FaChevronRight />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
                <div className="flex items-center">
                  <FaGraduationCap className="mr-3" />
                  <span>Track Skill</span>
                </div>
                <FaChevronRight />
              </button>
              
            </div>
          </div>
        </div>

        {/* Bottom Section: Upcoming Deadlines and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Deadlines */}
          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FaCalendarAlt className="mr-2" />
                Upcoming Deadlines
              </h2>
              <span className="text-sm text-gray-400">Next 5 items</span>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getPriorityColor(deadline.priority).replace('text-', 'bg-')}`} />
                      <div>
                        <h3 className="font-medium">{deadline.title}</h3>
                        <p className="text-sm text-gray-400">Due {formatDate(deadline.dueDate)}</p>
                      </div>
                    </div>
                    <FaClock className="text-gray-400" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FaCalendarCheck className="mx-auto text-3xl mb-2" />
                  <p>No upcoming deadlines</p>
                </div>
              )}
            </div>
          </div>

          {/* Achievements Panel */}
          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl border border-white border-opacity-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FaAward className="mr-2" />
                Achievements
              </h2>
              <span className="text-sm text-gray-400">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-500 shadow-lg'
                      : 'bg-white bg-opacity-5 border-white border-opacity-10'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`text-xl mr-2 ${achievement.unlocked ? 'text-yellow-200' : 'text-gray-400'}`}>
                      {achievement.icon}
                    </div>
                    <h3 className={`font-medium text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-300'}`}>
                      {achievement.title}
                    </h3>
                  </div>
                  <p className={`text-xs ${achievement.unlocked ? 'text-yellow-100' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions Component */}
        <AISuggestions recommendations={recommendations} />

        {/* Add Goal Modal */}
        {showAddGoalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-6">
                Add New Goal
              </h3>
              <form onSubmit={handleAddGoalSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={newGoalFormData.title}
                      onChange={(e) => setNewGoalFormData({ ...newGoalFormData, title: e.target.value })}
                      className="w-full bg-gray-700 bg-opacity-50 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
                      required
                      placeholder="Enter goal title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      value={newGoalFormData.description}
                      onChange={(e) => setNewGoalFormData({ ...newGoalFormData, description: e.target.value })}
                      className="w-full bg-gray-700 bg-opacity-50 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
                      rows={3}
                      required
                      placeholder="Describe your goal"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Date</label>
                    <input
                      type="date"
                      value={newGoalFormData.targetDate}
                      onChange={(e) => setNewGoalFormData({ ...newGoalFormData, targetDate: e.target.value })}
                      className="w-full bg-gray-700 bg-opacity-50 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={newGoalFormData.priority}
                      onChange={(e) => setNewGoalFormData({ ...newGoalFormData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full bg-gray-700 bg-opacity-50 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors duration-200"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowAddGoalModal(false)}
                    className="px-6 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Add Goal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Goal Details Modal */}
        {selectedGoal && showGoalDetailsModal && (
          <GoalDetails goal={selectedGoal} onClose={() => setShowGoalDetailsModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;