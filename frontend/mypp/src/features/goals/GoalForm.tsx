import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewGoal, modifyGoal, resetSuccess } from './goalSlice';
import { Goal, GoalFormData } from './goalTypes';
import Button from '../../components/Button';

interface GoalFormProps {
  existingGoal?: Goal;
  onSuccess?: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ existingGoal, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.goals);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalFormData>({
    defaultValues: {
      title: existingGoal?.title || '',
      description: existingGoal?.description || '',
      deadline: existingGoal?.deadline || '',
      priority: existingGoal?.priority || 'medium',
    },
  });

  useEffect(() => {
    if (success) {
      reset();
      dispatch(resetSuccess());
      if (onSuccess) onSuccess();
    }
  }, [success, reset, dispatch, onSuccess]);

  const onSubmit: SubmitHandler<GoalFormData> = async (data) => {
    if (existingGoal) {
      await dispatch(modifyGoal({ id: existingGoal.id, goalData: data }));
    } else {
      await dispatch(addNewGoal(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Goal Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            {...register('priority')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            {...register('deadline', { required: 'Deadline is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : (existingGoal ? 'Update Goal' : 'Create Goal')}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
