
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSummary } from './resumeSlice';
import { Edit } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SummaryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector((state) => state.resume.summary);

  const handleChange = (value: string) => {
    dispatch(updateSummary(value));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
        <Edit className="mr-3 text-blue-500" />
        Professional Summary
      </h3>
      <ReactQuill
        theme="snow"
        value={summary}
        onChange={handleChange}
        placeholder="Write a brief summary about your professional background..."
        className="bg-white"
      />
    </div>
  );
};

export default SummaryForm;
