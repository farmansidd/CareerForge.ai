import React from 'react';
import { CareerGoal, GoalStep } from '../types';
import { FaCheckCircle, FaRegCircle, FaSpinner, FaCalendarAlt } from 'react-icons/fa';

interface GoalDetailsProps {
  goal: CareerGoal;
  onClose: () => void;
}

const GoalDetails: React.FC<GoalDetailsProps> = ({ goal, onClose }) => {
  const getStepStatusIcon = (status: GoalStep['status']) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'in_progress':
        return <FaSpinner className="text-blue-500 animate-spin" />;
      case 'not_started':
      default:
        return <FaRegCircle className="text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 w-full max-w-2xl relative border border-white border-opacity-20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-4">
          {goal.title}
        </h2>
        <p className="text-gray-300 mb-4">{goal.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-6">
          <div>
            <span className="font-semibold">Target Date:</span> {new Date(goal.targetDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Priority:</span> {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
          </div>
          <div>
            <span className="font-semibold">Progress:</span> {goal.progress}%
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">Steps to Achieve</h3>
        {goal.steps && goal.steps.length > 0 ? (
          <ul className="space-y-3">
            {goal.steps.map((step) => (
              <li key={step.id} className="flex items-start bg-white bg-opacity-5 p-3 rounded-md">
                <div className="mr-3 mt-1">{getStepStatusIcon(step.status)}</div>
                <div>
                  <h4 className="font-semibold text-white">{step.title}</h4>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                  {step.dueDate && (
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <FaCalendarAlt className="mr-1" /> Due: {new Date(step.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  {step.aiSuggested && (
                    <span className="text-xs text-indigo-400"> (AI Suggested)</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No steps defined for this goal yet.</p>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
