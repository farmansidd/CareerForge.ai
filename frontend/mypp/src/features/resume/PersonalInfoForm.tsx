import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updatePersonalInfo } from './resumeSlice';
import { User, Mail, Phone } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state) => state.resume.personalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [name]: value }));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center"><User className="mr-3"/>Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute top-3 left-3 text-blue-300" />
          <input type="text" name="name" value={personalInfo.name} onChange={handleChange} placeholder="Name" className="p-3 pl-10 w-full rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
        </div>
        <div className="relative">
          <Mail className="absolute top-3 left-3 text-blue-300" />
          <input type="email" name="email" value={personalInfo.email} onChange={handleChange} placeholder="Email" className="p-3 pl-10 w-full rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
        </div>
        <div className="relative">
          <Phone className="absolute top-3 left-3 text-blue-300" />
          <input type="tel" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="Phone" className="p-3 pl-10 w-full rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
        </div>
        <div className="relative">
          <FaLinkedin className="absolute top-3 left-3 text-blue-300" />
          <input type="text" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} placeholder="LinkedIn" className="p-3 pl-10 w-full rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
        </div>
        <div className="relative">
          <FaGithub className="absolute top-3 left-3 text-blue-300" />
          <input type="text" name="github" value={personalInfo.github} onChange={handleChange} placeholder="GitHub" className="p-3 pl-10 w-full rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm; 