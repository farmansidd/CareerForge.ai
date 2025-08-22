import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addEducation, updateEducation, removeEducation } from './resumeSlice';
import { FaGraduationCap, FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';


const EducationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const educations = useAppSelector((state) => state.resume.education);

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  const handleRemoveEducation = (id: string) => {
    dispatch(removeEducation(id));
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateEducation({ id, data: { [name]: value } }));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center"><FaGraduationCap className="mr-3 text-blue-300"/>Education</h3>
      {educations.map((edu) => (
        <div key={edu.id} className="mb-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(edu.id, e)} placeholder="Degree (e.g., B.S. in Computer Science)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="school" value={edu.school} onChange={(e) => handleChange(edu.id, e)} placeholder="School or University" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="location" value={edu.location} onChange={(e) => handleChange(edu.id, e)} placeholder="Location" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="graduationDate" value={edu.graduationDate} onChange={(e) => handleChange(edu.id, e)} placeholder="Graduation Date (e.g., May 2024)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
          </div>
          <button onClick={() => handleRemoveEducation(edu.id)} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
            <Trash2 className="mr-2" /> Remove
            </button>
        </div>
      ))}
      <button onClick={handleAddEducation} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
        <FaPlus className="mr-2" /> Add Education
        </button>
    </div>
  );
};

export default EducationForm;