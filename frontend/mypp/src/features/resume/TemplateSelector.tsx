import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

// Template interfaces
interface TemplateProps {
  resume: any;
}

// Classic Professional Template
const ClassicTemplate: React.FC<TemplateProps> = ({ resume }) => (
  <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-serif">
    <header className="text-center mb-8 border-b-2 border-gray-300 pb-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{resume.personalInfo.name}</h1>
      <div className="text-sm text-gray-600 space-y-1">
        <div>{resume.personalInfo.email} • {resume.personalInfo.phone}</div>
        <div>{resume.personalInfo.linkedin} • {resume.personalInfo.github}</div>
      </div>
    </header>

    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h2>
      <p className="text-gray-700 text-sm leading-relaxed">{resume.summary}</p>
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
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
            {Array.isArray(exp.description) && exp.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-bold text-gray-700 mb-3 border-b border-gray-200 pb-1">ACADEMIC PROJECTS</h2>
      {resume.projects.map((project) => (
        <div key={project.id} className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
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

// Modern Creative Template
const ModernTemplate: React.FC<TemplateProps> = ({ resume }) => (
  <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-sans">
    <div className="grid grid-cols-3 gap-8">
      {/* Left Sidebar */}
      <div className="col-span-1 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{resume.personalInfo.name}</h1>
          <div className="w-16 h-0.5 bg-white mx-auto mb-4"></div>
          <div className="text-sm space-y-1">
            <div>{resume.personalInfo.email}</div>
            <div>{resume.personalInfo.phone}</div>
            <div className="text-xs mt-2">{resume.personalInfo.linkedin}</div>
            <div className="text-xs">{resume.personalInfo.github}</div>
          </div>
        </div>

        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">SKILLS</h2>
          <div className="space-y-2">
            {resume.skills.map((skill, index) => (
              <div key={index} className="bg-white/20 px-3 py-1 rounded-full text-xs text-center">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">EDUCATION</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4 text-sm">
              <div className="font-bold">{edu.degree}</div>
              <div className="text-xs opacity-90">{edu.school}</div>
              <div className="text-xs opacity-75">{edu.graduationDate}</div>
            </div>
          ))}
        </section>
        
        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">CERTIFICATIONS</h2>
          {resume.certifications.map((cert) => (
            <div key={cert.id} className="mb-4 text-sm">
              <div className="font-bold">{cert.name}</div>
              <div className="text-xs opacity-90">{cert.issuer}</div>
              <div className="text-xs opacity-75">{cert.date}</div>
            </div>
          ))}
        </section>
      </div>

      {/* Right Content */}
      <div className="col-span-2">
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">SUMMARY</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{resume.summary}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">EXPERIENCE</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-6 border-l-4 border-blue-200 pl-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                <span className="text-sm text-blue-600 font-medium">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-md font-semibold text-gray-600 mb-2">{exp.company} • {exp.location}</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {Array.isArray(exp.description) && exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">PROJECTS</h2>
          {resume.projects.map((project) => (
            <div key={project.id} className="mb-6 border-l-4 border-blue-200 pl-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">Link</a>}
              </div>
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
);

// Minimal Template
const MinimalTemplate: React.FC<TemplateProps> = ({ resume }) => (
  <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-light">
    <header className="mb-10">
      <h1 className="text-5xl font-thin text-gray-900 mb-3">{resume.personalInfo.name}</h1>
      <div className="flex gap-6 text-sm text-gray-600">
        <span>{resume.personalInfo.email}</span>
        <span>{resume.personalInfo.phone}</span>
        <span>{resume.personalInfo.linkedin}</span>
        <span>{resume.personalInfo.github}</span>
      </div>
    </header>

    <section className="mb-8">
      <p className="text-gray-700 text-base leading-relaxed italic">{resume.summary}</p>
    </section>

    <section className="mb-8">
      <h2 className="text-lg font-normal text-gray-800 mb-4 tracking-wide uppercase">Experience</h2>
      {resume.experience.map((exp) => (
        <div key={exp.id} className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-xl font-medium text-gray-900">{exp.title}</h3>
            <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
          </div>
          <div className="text-lg text-gray-600 mb-3">{exp.company}, {exp.location}</div>
          <ul className="text-sm text-gray-700 space-y-2">
            {Array.isArray(exp.description) && exp.description.map((desc, i) => (
              <li key={i} className="leading-relaxed">→ {desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <section className="mb-8">
      <h2 className="text-lg font-normal text-gray-800 mb-4 tracking-wide uppercase">Projects</h2>
      {resume.projects.map((project) => (
        <div key={project.id} className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-xl font-medium text-gray-900">{project.name}</h3>
            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500">Link</a>}
          </div>
          <p className="text-gray-700 text-sm mb-2">{project.description}</p>
          <div className="text-sm text-gray-600">
            Technologies: {project.technologies.join(', ')}
          </div>
        </div>
      ))}
    </section>

    <div className="grid grid-cols-2 gap-8">
      <section>
        <h2 className="text-lg font-normal text-gray-800 mb-4 tracking-wide uppercase">Education</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
            <div className="text-md text-gray-600">{edu.school}</div>
            <div className="text-sm text-gray-500">{edu.graduationDate}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-normal text-gray-800 mb-4 tracking-wide uppercase">Skills</h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          {resume.skills.join(', ')}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-normal text-gray-800 mb-4 tracking-wide uppercase">Certifications</h2>
        {resume.certifications.map((cert) => (
          <div key={cert.id} className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
            <div className="text-md text-gray-600">{cert.issuer}</div>
            <div className="text-sm text-gray-500">{cert.date}</div>
          </div>
        ))}
      </section>
    </div>
  </div>
);

// Executive Template
const ExecutiveTemplate: React.FC<TemplateProps> = ({ resume }) => (
  <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-serif">
    <header className="text-center mb-8 bg-gray-100 p-6 rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">{resume.personalInfo.name}</h1>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 max-w-md mx-auto">
        <div>📧 {resume.personalInfo.email}</div>
        <div>📱 {resume.personalInfo.phone}</div>
        <div>🔗 {resume.personalInfo.linkedin}</div>
        <div>💻 {resume.personalInfo.github}</div>
      </div>
    </header>

    <section className="mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
      <h2 className="text-2xl font-bold text-blue-700 mb-3">Executive Summary</h2>
      <p className="text-gray-700 text-sm leading-relaxed italic">{resume.summary}</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-gray-100 py-2 rounded">Professional Experience</h2>
      {resume.experience.map((exp) => (
        <div key={exp.id} className="mb-6 bg-gray-50 p-4 rounded-lg border">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-3">{exp.company} • {exp.location}</div>
          <ul className="list-none text-sm text-gray-700 space-y-2">
            {Array.isArray(exp.description) && exp.description.map((desc, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-500 mr-2">▸</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center bg-gray-100 py-2 rounded">Academic Projects</h2>
      {resume.projects.map((project) => (
        <div key={project.id} className="mb-6 bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
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

    <div className="grid grid-cols-2 gap-6">
      <section className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Education</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} className="mb-3 text-center">
            <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
            <div className="text-md text-gray-700">{edu.school}</div>
            <div className="text-sm text-gray-600">{edu.graduationDate}</div>
          </div>
        ))}
      </section>

      <section className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-blue-700 mb-3 text-center">Core Competencies</h2>
        <div className="grid grid-cols-1 gap-2">
          {resume.skills.map((skill, index) => (
            <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm text-center font-medium">
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-4 rounded-lg col-span-2">
        <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">Certifications</h2>
        {resume.certifications.map((cert) => (
          <div key={cert.id} className="mb-3 text-center">
            <h3 className="text-lg font-bold text-gray-800">{cert.name}</h3>
            <div className="text-md text-gray-700">{cert.issuer} - {cert.date}</div>
          </div>
        ))}
      </section>
    </div>
  </div>
);

// Creative Template
const CreativeTemplate: React.FC<TemplateProps> = ({ resume }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto font-sans">
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
        <p className="text-gray-700 text-sm leading-relaxed text-center italic">{resume.summary}</p>
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
            <ul className="list-none text-sm text-gray-700 space-y-2">
              {Array.isArray(exp.description) && exp.description.map((desc, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-500 mr-2">💫</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
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
            <p className="text-sm text-gray-700 mb-3">{project.description}</p>
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

// Main Template Selector Component
const TemplateSelector: React.FC<{ selectedTemplateId: string; setSelectedTemplateId: (id: string) => void; setCurrentTab: (tab: 'editor' | 'templates') => void }> = ({ selectedTemplateId, setSelectedTemplateId, setCurrentTab }) => {
  const resume = useAppSelector((state) => state.resume);

  const templates = [
    {
      id: 'classic',
      name: 'Classic Professional',
      description: 'Traditional, clean format perfect for corporate environments',
      component: ClassicTemplate
    },
    {
      id: 'modern',
      name: 'Modern Sidebar',
      description: 'Contemporary design with sidebar layout and color accents',
      component: ModernTemplate
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Ultra-clean design focusing on typography and whitespace',
      component: MinimalTemplate
    },
    {
      id: 'executive',
      name: 'Executive Style',
      description: 'Professional format with structured sections and highlights',
      component: ExecutiveTemplate
    },
    {
      id: 'creative',
      name: 'Creative Gradient',
      description: 'Eye-catching design with gradients and creative elements',
      component: CreativeTemplate
    }
  ];

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplateId)?.component || ClassicTemplate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Resume Template Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professional resume templates. Each template is designed 
            to highlight your experience and skills in a unique, professional way.
          </p>
        </div>

        {/* Template Selector */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Select Your Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedTemplateId === template.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
                  <p className="text-xs text-gray-600">{template.description}</p>
                  {selectedTemplateId === template.id && (
                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Preview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Preview</h2>
            <div className="flex gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Download PDF
              </button>
              <button 
                onClick={() => {
                  setSelectedTemplateId(selectedTemplateId);
                  setCurrentTab('editor');
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
          
          <div className="overflow-auto max-h-[800px] border rounded-lg">
            <div className="min-w-[800px]">
              <SelectedTemplateComponent resume={resume} />
            </div>
          </div>
        </div>

        {/* Template Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">5</h3>
            <p className="text-gray-600">Professional Templates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-green-600 mb-2">100%</h3>
            <p className="text-gray-600">ATS Compatible</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-2">∞</h3>
            <p className="text-gray-600">Customizable</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateSelector;