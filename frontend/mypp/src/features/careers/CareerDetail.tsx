import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCareerDetails, clearCurrentCareer } from './careerSlice';
import LoadingSpinner from './../../components/LoadingSpinner';

const CareerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentCareer, loading, error } = useAppSelector((state) => state.careers);

  useEffect(() => {
    if (id) {
      dispatch(loadCareerDetails(id));
    }
    return () => {
      dispatch(clearCurrentCareer());
    };
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!currentCareer) return <div className="p-4">Career not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-700"
      >
        ← Back to Careers
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">{currentCareer.title}</h1>
              <p className="text-gray-600 mb-4">{currentCareer.category}</p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-semibold">
                  ${currentCareer.average_salary.toLocaleString()}
                </span>
                <span className="text-gray-500 ml-2">/ year (avg)</span>
              </div>
            </div>
            {currentCareer.growth_rate && (
              <div className="bg-blue-50 p-4 rounded-lg self-start">
                <p className="text-blue-800 font-medium">
                  Growth Rate: {currentCareer.growth_rate}%
                </p>
                <p className="text-sm text-blue-600">(Projected 10-year growth)</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{currentCareer.description}</p>
          </div>

        
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
              View Learning Path
            </button>
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-lg">
              Save Career
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;