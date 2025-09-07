
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

interface ResumePreviewProps {
  templateId: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ templateId }) => {
  const resume = useAppSelector((state) => state.resume);

  const renderTemplate = () => {
    switch (templateId) {
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-2">
      <div className="aspect-[8.5/11] w-full overflow-auto border">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
