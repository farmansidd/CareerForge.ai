
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSkill, removeSkill } from './resumeSlice';
import { FaTools, FaPlus } from 'react-icons/fa';
import { X } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector((state) => state.resume.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      dispatch(addSkill(newSkill.trim()));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    dispatch(removeSkill(index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
        <FaTools className="mr-3 text-blue-500" />
        Skills
      </h3>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          className="p-3 flex-grow rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddSkill}
          className="bg-blue-600 text-white px-5 py-3 rounded-r-lg hover:bg-blue-700 shadow-md flex items-center transition-all duration-200 h-full"
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            <span>{skill}</span>
            <button
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 text-blue-800 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
