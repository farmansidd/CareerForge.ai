import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProject, updateProject, removeProject } from './resumeSlice';
import { FaPlus } from 'react-icons/fa';
import { Trash2, Briefcase } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProjectsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.resume.projects);

  const handleAddProject = () => {
    dispatch(addProject());
  };

  const handleRemoveProject = (id: string) => {
    dispatch(removeProject(id));
  };

  const handleChange = (id: string, name: string, value: string | string[]) => {
    const data = { [name]: value };
    dispatch(updateProject({ id, data }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
        <Briefcase className="mr-3 text-blue-500" />
        Projects
      </h3>
      {projects.map((project) => (
        <div key={project.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(project.id, e.target.name, e.target.value)}
              placeholder="Project Name"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="url"
              value={project.url}
              onChange={(e) => handleChange(project.id, e.target.name, e.target.value)}
              placeholder="Project URL"
              className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ReactQuill
            theme="snow"
            value={project.description}
            onChange={(value) => handleChange(project.id, 'description', value)}
            placeholder="Project description..."
            className="mt-4 bg-white"
          />
          <input
            type="text"
            name="technologies"
            value={project.technologies.join(', ')}
            onChange={(e) => handleChange(project.id, e.target.name, e.target.value.split(',').map(t => t.trim()))}
            placeholder="Technologies (comma-separated)"
            className="p-3 mt-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleRemoveProject(project.id)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddProject}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200"
      >
        <FaPlus className="mr-2" /> Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;