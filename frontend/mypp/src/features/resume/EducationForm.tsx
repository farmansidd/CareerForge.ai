
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
        <FaGraduationCap className="mr-3 text-blue-500" />
        Education
      </h3>
      {educations.map((edu) => (
        <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Degree"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="school"
              value={edu.school}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="School"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="location"
              value={edu.location}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Location"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="graduationDate"
              value={edu.graduationDate}
              onChange={(e) => handleChange(edu.id, e)}
              placeholder="Graduation Date"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => handleRemoveEducation(edu.id)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddEducation}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200"
      >
        <FaPlus className="mr-2" /> Add Education
      </button>
    </div>
  );
};

export default EducationForm;
