import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { FaBook, FaBullseye, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRoadmapStore } from '../store/roadmapStore';

const DashboardPage: React.FC = () => {
  const { roadmaps, loading, error, fetchRoadmaps } = useRoadmapStore();

  useEffect(() => {
    fetchRoadmaps();
  }, [fetchRoadmaps]);

  const weeklyProgressOptions = {
    chart: {
      id: 'weekly-progress',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
        title: {
            text: 'Minutes'
        }
    }
  };

  const weeklyProgressSeries = [
    {
      name: 'Learning Time',
      data: [30, 40, 45, 50, 49, 60, 70],
    },
  ];

  const overallProgressOptions = {
    chart: {
      id: 'overall-progress',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
            name: {
                show: true,
                fontSize: '22px',
            },
            value: {
                show: true,
                fontSize: '16px',
                formatter: function (val: any) {
                    return val + '%'
                }
            }
        }
      },
    },
    labels: ['Overall Progress'],
  };

  const overallProgressSeries = [0]; // Placeholder

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 flex items-center">
          <FaChartLine className="text-4xl text-blue-400 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Weekly Progress</h3>
            <p>Your learning stats for the week</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 flex items-center">
          <FaBullseye className="text-4xl text-green-400 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Current Goals</h3>
            <p>3 active goals</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 flex items-center">
          <FaBook className="text-4xl text-yellow-400 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Recommended Courses</h3>
            <p>5 new recommendations</p>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 flex items-center">
          <FaLightbulb className="text-4xl text-purple-400 mr-4" />
          <div>
            <h3 className="text-xl font-bold">Insights</h3>
            <p>You are doing great!</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Weekly Learning Activity</h2>
          <Chart
            options={weeklyProgressOptions}
            series={weeklyProgressSeries}
            type="bar"
            height={350}
          />
        </div>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
          <Chart
            options={overallProgressOptions}
            series={overallProgressSeries}
            type="radialBar"
            height={350}
          />
        </div>
      </div>
      <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">My Roadmaps</h2>
        <ul>
          {(roadmaps || []).map((roadmap) => {
            return (
              <li key={roadmap.id} className="flex items-center justify-between p-2 border-b border-gray-700">
                <Link to={`/roadmaps/${roadmap.id}`} className="w-full">
                  <span>{roadmap.title}</span>
                  <div className="w-1/2 bg-gray-700 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{width: `0%`}}></div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold">Advanced React Patterns</h3>
                <p className="text-gray-400">Take your React skills to the next level.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold">TypeScript for Professionals</h3>
                <p className="text-gray-400">Master TypeScript for large-scale applications.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-xl font-bold">Node.js Masterclass</h3>
                <p className="text-gray-400">Build scalable and performant backend services.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;