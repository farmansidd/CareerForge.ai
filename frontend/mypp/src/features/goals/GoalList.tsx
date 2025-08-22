import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  loadGoals,
  removeGoal,
  changeGoalStatus,
} from './goalSlice';
import { Goal } from './goalTypes';
import GoalItem from './GoalItem';
import LoadingSpinner from './../../components/LoadingSpinner';
import Button from './../../components/Button';
import GoalForm from './GoalForm';

const GoalList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { goals, loading, error } = useAppSelector((state) => state.goals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    dispatch(loadGoals());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await dispatch(removeGoal(id));
    }
  };

  const handleStatusChange = async (id: string, status: Goal['status']) => {
    await dispatch(changeGoalStatus({ id, status }));
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingGoal(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Goals</h2>
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="primary"
        >
          Add New Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Goals Yet</h3>
          <p className="text-gray-600 mb-4">Start by creating your first goal</p>
          <Button
            onClick={() => setIsFormOpen(true)}
            variant="primary"
          >
            Create Goal
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingGoal ? 'Edit Goal' : 'Create New Goal'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingGoal(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <GoalForm
              existingGoal={editingGoal || undefined}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalList;
