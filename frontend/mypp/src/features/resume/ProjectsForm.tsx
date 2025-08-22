import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProject, updateProject, removeProject } from './resumeSlice';
import { FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.resume.projects);

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleRemoveProject = (id: string) => {
    dispatch(removeProject(id));
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateProject({ id, data: { [name]: value } }));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Academic Projects</h3>
      {projects.map((project) => (
        <div key={project.id} className="mb-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={project.name} onChange={(e) => handleChange(project.id, e)} placeholder="Project Name" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="url" value={project.url} onChange={(e) => handleChange(project.id, e)} placeholder="Project URL (Optional)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
          </div>
          <textarea
            name="description"
            value={project.description}
            onChange={(e) => handleChange(project.id, e)}
            placeholder="Project description"
            className="w-full mt-4 p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-24 transition-all duration-200"
          />
          <button onClick={() => handleRemoveProject(project.id)} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </button>
        </div>
      ))}
      <button onClick={handleAddProject} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
        <FaPlus className="mr-2" /> Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;