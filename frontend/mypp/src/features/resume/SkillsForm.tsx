import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSkill, updateSkill, removeSkill } from './resumeSlice';
import { FaTools, FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

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

  const handleUpdateSkill = (index: number, value: string) => {
    dispatch(updateSkill({ index, value }));
  };

  const handleRemoveSkill = (index: number) => {
    dispatch(removeSkill(index));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center"><FaTools className="mr-3 text-blue-300"/>Technical Skills</h3>
      <div className="flex items-center mb-4 rounded-lg overflow-hidden border border-gray-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          className="p-3 flex-grow bg-gray-700/30 text-gray-900 placeholder-gray-600 focus:outline-none"
        />
        <button onClick={handleAddSkill} className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 shadow-md flex items-center transition-all duration-200 h-full">
          <FaPlus className="mr-2" /> Add
          </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center rounded-lg overflow-hidden border border-gray-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleUpdateSkill(index, e.target.value)}
              className="p-3 flex-grow bg-gray-700/30 text-gray-900 placeholder-gray-600 focus:outline-none"
            />
            <button onClick={() => handleRemoveSkill(index)} className="bg-red-600 text-white px-4 py-3 hover:bg-red-700 shadow-md flex items-center transition-all duration-200 h-full">
              <Trash2 className="w-4 h-4"/>
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;