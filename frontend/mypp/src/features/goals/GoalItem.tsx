import React from 'react';
import { Goal } from './goalTypes';
import Button from './../../components/Button';

interface GoalItemProps {
  goal: Goal;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Goal['status']) => void;
  onEdit: (goal: Goal) => void;
}

function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleString();
}

const GoalItem: React.FC<GoalItemProps> = ({
  goal,
  onDelete,
  onStatusChange,
  onEdit,
}) => {
  const statusOptions: { value: Goal['status']; label: string }[] = [
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold">{goal.title}</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              goal.priority === 'high' ? 'bg-red-100 text-red-800' :
              goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>{goal.priority}</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              goal.status === 'completed' ? 'bg-green-100 text-green-800' :
              goal.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>{goal.status}</span>
          </div>
          <p className="text-gray-600 mb-3">{goal.description}</p>
          <p className="text-sm text-gray-500">
            Deadline: {new Date(goal.deadline).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit(goal)}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={() => onDelete(goal.id)}
            variant="secondary"
            size="sm"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <select
          value={goal.status}
          onChange={(e) => onStatusChange(goal.id, e.target.value as Goal['status'])}
          className="text-sm border rounded px-3 py-1"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="text-xs text-gray-400">
          Last updated: {formatDate(goal.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default GoalItem;