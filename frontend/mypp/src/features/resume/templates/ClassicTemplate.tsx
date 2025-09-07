import React from 'react';
import { ResumeState } from '../resumeTypes';

interface TemplateProps {
  resume: ResumeState;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ resume }) => {
  return (
    <div className="bg-white text-gray-800 p-8 font-serif">
      <header className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resume.personalInfo.name}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{resume.personalInfo.email} • {resume.personalInfo.phone}</div>
          <div>{resume.personalInfo.linkedin} • {resume.personalInfo.github}</div>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h2>
        <div className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: resume.summary }}></div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">WORK EXPERIENCE</h2>
        {resume.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
              <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="text-md font-semibold text-gray-700 mb-2">{exp.company} | {exp.location}</div>
            <div className="text-sm text-gray-700 space-y-1 ml-4" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">PROJECTS</h2>
        {resume.projects.map((project) => (
          <div key={project.id} className="mb-4">
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

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">EDUCATION</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
              <span className="text-sm text-gray-600">{edu.graduationDate}</span>
            </div>
            <div className="text-md text-gray-700">{edu.school} | {edu.location}</div>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">CERTIFICATIONS</h2>
        {resume.certifications.map((cert) => (
          <div key={cert.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold text-gray-800">{cert.name}</h3>
              <span className="text-sm text-gray-600">{cert.date}</span>
            </div>
            <div className="text-md text-gray-700">{cert.issuer}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">TECHNICAL SKILLS</h2>
        <div className="text-sm text-gray-700">
          {resume.skills.join(' • ')}
        </div>
      </section>
    </div>
  );
};

export default ClassicTemplate;