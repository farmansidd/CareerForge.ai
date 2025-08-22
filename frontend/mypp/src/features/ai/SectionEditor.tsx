import React from 'react';
import { ResumeSection } from './resumeTypes';

interface SectionEditorProps {
  section: ResumeSection;
  isActive: boolean;
  onActivate: () => void;
  onUpdate: (content: string) => void;
  onRemove: () => void;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  isActive,
  onActivate,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold capitalize">{section.type}</h4>
        <div className="flex gap-2">
          <button
            onClick={onActivate}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {isActive ? 'Collapse' : 'Edit'}
          </button>
          <button
            onClick={onRemove}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
      
      {isActive && (
        <textarea
          value={section.content}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={`Enter your ${section.type} content...`}
          className="w-full p-2 border rounded min-h-32"
        />
      )}
      
      {!isActive && section.content && (
        <div className="text-sm text-gray-700">
          {section.content.length > 100 
            ? `${section.content.substring(0, 100)}...` 
            : section.content}
        </div>
      )}
    </div>
  );
};

export default SectionEditor;
