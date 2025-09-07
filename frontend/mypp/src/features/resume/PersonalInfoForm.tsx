import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updatePersonalInfo } from './resumeSlice';
import { User, Mail, Phone, Linkedin, Github } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector((state) => state.resume.personalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
        <User className="mr-3 text-blue-500" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            placeholder="Name"
            className="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <User className="absolute top-3 left-3 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <Mail className="absolute top-3 left-3 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <Phone className="absolute top-3 left-3 text-gray-400" />
        </div>
        <div className="relative">
          <input
            type="text"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
            className="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <Linkedin className="absolute top-3 left-3 text-gray-400" />
        </div>
        <div className="relative md:col-span-2">
          <input
            type="text"
            name="github"
            value={personalInfo.github}
            onChange={handleChange}
            placeholder="GitHub"
            className="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <Github className="absolute top-3 left-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;