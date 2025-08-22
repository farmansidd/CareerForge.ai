import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Career } from './careerTypes';

interface CareerCardProps {
  career: Career;
}

const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/careers/${career.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {career.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {career.description}
        </p>
        
        <div className="mb-4">
          <p className="text-lg font-semibold text-green-600">
            ${career.average_salary.toLocaleString()}/year
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {career.skills.slice(0, 3).map((skill) => (
            <span 
              key={skill} 
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
          {career.skills.length > 3 && (
            <span className="text-xs text-gray-500">
              +{career.skills.length - 3} more
            </span>
          )}
        </div>
        
        {career.growth_rate && (
          <div className="text-sm">
            <span className="text-gray-600">Growth: </span>
            <span className="font-medium text-green-600">{career.growth_rate}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCard;
