import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSummary } from './resumeSlice';
import { Edit } from 'lucide-react';

const SummaryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector((state) => state.resume.summary);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateSummary(e.target.value));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center"><Edit className="mr-3 text-blue-300"/>Summary</h3>
      <textarea
        name="summary"
        value={summary}
        onChange={handleChange}
        placeholder="A brief summary about you"
        className="w-full p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32 transition-all duration-200"
      />
    </div>
  );
};

export default SummaryForm;