import React from 'react';
import { ResumeState } from '../resumeTypes';

interface TemplateProps {
  resume: ResumeState;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ resume }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 p-8 font-sans">
      <header className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {resume.personalInfo.name}
          </h1>
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <span className="bg-purple-100 px-3 py-1 rounded-full">{resume.personalInfo.email}</span>
            <span className="bg-pink-100 px-3 py-1 rounded-full">{resume.personalInfo.phone}</span>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <span className="text-purple-600">{resume.personalInfo.linkedin}</span>
            <span className="text-pink-600">{resume.personalInfo.github}</span>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">✨ About Me</h2>
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
          <div className="text-gray-700 text-sm leading-relaxed text-center italic" dangerouslySetInnerHTML={{ __html: resume.summary }}></div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">🚀 Experience Journey</h2>
        {resume.experience.map((exp, index) => (
          <div key={exp.id} className="mb-6">
            <div className={`p-6 rounded-2xl ${index % 2 === 0 ? 'bg-purple-100/70 ml-8' : 'bg-pink-100/70 mr-8'} backdrop-blur-sm`}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                <span className="text-sm font-medium text-purple-600 bg-white px-3 py-1 rounded-full">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="text-md font-semibold text-gray-700 mb-3">{exp.company} • {exp.location}</div>
              <div className="list-none text-sm text-gray-700 space-y-2" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">💡 Projects Showcase</h2>
        {resume.projects.map((project, index) => (
          <div key={project.id} className="mb-6">
            <div className={`p-6 rounded-2xl ${index % 2 === 0 ? 'bg-pink-100/70 mr-8' : 'bg-purple-100/70 ml-8'} backdrop-blur-sm`}>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{project.name}</h3>
              <div className="text-sm text-gray-700 mb-3" dangerouslySetInnerHTML={{ __html: project.description }}></div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-white text-pink-500 px-3 py-1 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-6">
        <section className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-pink-600 mb-4 text-center">🎓 Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
              <div className="text-md text-gray-700">{edu.school}</div>
              <div className="text-sm text-pink-600">{edu.graduationDate}</div>
            </div>
          ))}
        </section>

        <section className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-purple-600 mb-4 text-center">🛠️ Skills Toolkit</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {resume.skills.map((skill, index) => (
              <span key={index} className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl col-span-2">
          <h2 className="text-xl font-bold text-purple-600 mb-4 text-center">🏆 Certifications</h2>
          <div className="text-center">
            {resume.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{cert.name}</span> from {cert.issuer} ({cert.date})
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreativeTemplate;