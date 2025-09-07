
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addExperience, updateExperience, removeExperience } from './resumeSlice';
import { FaBriefcase, FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ExperienceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const experiences = useAppSelector((state) => state.resume.experience);

  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleRemoveExperience = (id: string) => {
    dispatch(removeExperience(id));
  };

  const handleChange = (id: string, name: string, value: string) => {
    const data = { [name]: value };
    dispatch(updateExperience({ id, data }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
        <FaBriefcase className="mr-3 text-blue-500" />
        Work Experience
      </h3>
      {experiences.map((exp) => (
        <div key={exp.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={exp.title}
              onChange={(e) => handleChange(exp.id, e.target.name, e.target.value)}
              placeholder="Job Title"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleChange(exp.id, e.target.name, e.target.value)}
              placeholder="Company"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="location"
              value={exp.location}
              onChange={(e) => handleChange(exp.id, e.target.name, e.target.value)}
              placeholder="Location"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="startDate"
              value={exp.startDate}
              onChange={(e) => handleChange(exp.id, e.target.name, e.target.value)}
              placeholder="Start Date"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="endDate"
              value={exp.endDate}
              onChange={(e) => handleChange(exp.id, e.target.name, e.target.value)}
              placeholder="End Date"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ReactQuill
            theme="snow"
            value={exp.description}
            onChange={(value) => handleChange(exp.id, 'description', value)}
            placeholder="Job description..."
            className="mt-4 bg-white"
          />
          <button
            onClick={() => handleRemoveExperience(exp.id)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddExperience}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200"
      >
        <FaPlus className="mr-2" /> Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
