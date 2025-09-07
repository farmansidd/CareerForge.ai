import React from 'react';
import { ResumeState } from '../resumeTypes';

interface TemplateProps {
  resume: ResumeState;
}

const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => {
  return (
    <div className="bg-white text-gray-800 p-8 font-sans">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-1 pr-8 border-r-2 border-gray-200">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{resume.personalInfo.name}</h1>
            <div className="text-sm text-gray-600 space-y-1">
              <div>{resume.personalInfo.email}</div>
              <div>{resume.personalInfo.phone}</div>
              <div>{resume.personalInfo.linkedin}</div>
              <div>{resume.personalInfo.github}</div>
            </div>
          </header>

          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-gray-200 pb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <div key={index} className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-gray-200 pb-2">EDUCATION</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mb-4 text-sm">
                <div className="font-bold">{edu.degree}</div>
                <div className="text-xs opacity-90">{edu.school}</div>
                <div className="text-xs opacity-75">{edu.graduationDate}</div>
              </div>
            ))}
          </section>
        </div>

        {/* Right Content */}
        <div className="col-span-2">
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">SUMMARY</h2>
            <div className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: resume.summary }}></div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">EXPERIENCE</h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                  <span className="text-sm text-gray-600 font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-md font-semibold text-gray-700 mb-2">{exp.company} • {exp.location}</div>
                <div className="text-sm text-gray-700 space-y-1" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">PROJECTS</h2>
            {resume.projects.map((project) => (
              <div key={project.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                  {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">Link</a>}
                </div>
                <div className="text-sm text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: project.description }}></div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2">CERTIFICATIONS</h2>
            {resume.certifications.map((cert) => (
              <div key={cert.id} className="mb-4 text-sm">
                <div className="font-bold">{cert.name}</div>
                <div className="text-xs opacity-90">{cert.issuer}</div>
                <div className="text-xs opacity-75">{cert.date}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;