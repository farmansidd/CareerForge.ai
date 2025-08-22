import React from 'react';
import { useAppSelector } from '../../app/hooks';

const ResumePreview: React.FC = () => {
  const resume = useAppSelector((state) => state.resume);

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wider">{resume.personalInfo.name}</h1>
        <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
          <span>{resume.personalInfo.email}</span>
          <span>|</span>
          <span>{resume.personalInfo.phone}</span>
        </div>
        <div className="flex justify-center gap-4 mt-1 text-sm text-blue-600">
          <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">{resume.personalInfo.linkedin}</a>
          <span>|</span>
          <a href={resume.personalInfo.github} target="_blank" rel="noopener noreferrer">{resume.personalInfo.github}</a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Summary</h2>
        <p className="text-gray-700 text-sm">{resume.summary}</p>
      </section>

      {/* Work Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Work Experience</h2>
        {resume.experience.map((exp) => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
              <span className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="text-md font-semibold text-blue-600">{exp.company}</h4>
              <span className="text-sm italic text-gray-500">{exp.location}</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {Array.isArray(exp.description) && exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Academic Projects */}
      {resume.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Academic Projects</h2>
          {resume.projects.map((project) => (
            <div key={project.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">Link</a>}
              </div>
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
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
      )}

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Education</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
              <span className="text-sm font-medium text-gray-600">{edu.graduationDate}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <h4 className="text-md font-semibold text-blue-600">{edu.school}</h4>
              <span className="text-sm italic text-gray-500">{edu.location}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Certifications / Achievements */}
      {resume.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Certifications & Achievements</h2>
          {resume.certifications.map((cert) => (
            <div key={cert.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold text-gray-800">{cert.name}</h3>
                <span className="text-sm font-medium text-gray-600">{cert.date}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="text-md font-semibold text-blue-600">{cert.issuer}</h4>
                {cert.url && <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">Credential</a>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-700">Technical Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumePreview;