import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addExperience, updateExperience, removeExperience } from './resumeSlice';
import { FaBriefcase, FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

const ExperienceForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const experiences = useAppSelector((state) => state.resume.experience);

  const handleAddExperience = () => {
    dispatch(addExperience());
  };

  const handleRemoveExperience = (id: string) => {
    dispatch(removeExperience(id));
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const data = { [name]: name === 'description' ? value.split('\n') : value };
    dispatch(updateExperience({ id, data }));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center"><FaBriefcase className="mr-3 text-blue-300"/>Work Experience</h3>
      {experiences.map((exp) => (
        <div key={exp.id} className="mb-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={exp.title} onChange={(e) => handleChange(exp.id, e)} placeholder="Job Title" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="company" value={exp.company} onChange={(e) => handleChange(exp.id, e)} placeholder="Company" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="location" value={exp.location} onChange={(e) => handleChange(exp.id, e)} placeholder="Location" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleChange(exp.id, e)} placeholder="Start Date (e.g., Jan 2020)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleChange(exp.id, e)} placeholder="End Date (e.g., Present)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
          </div>
          <textarea
            name="description"
            value={Array.isArray(exp.description) ? exp.description.join('\n') : ''}
            onChange={(e) => handleChange(exp.id, e)}
            placeholder="Job description (one point per line)"
            className="w-full mt-4 p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24 transition-all duration-200"
          />
          <button onClick={() => handleRemoveExperience(exp.id)} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
            <Trash2 className="w-4 h-4 mr-2" /> Remove
            </button>
        </div>
      ))}
      <button onClick={handleAddExperience} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
        <FaPlus className="mr-2" /> Add Experience
        </button>
    </div>
  );
};

export default ExperienceForm;