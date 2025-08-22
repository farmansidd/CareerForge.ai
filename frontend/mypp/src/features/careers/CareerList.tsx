import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCareers, searchCareerList, loadRecommendedCareers } from './careerSlice';
import { Career } from './careerTypes';
import CareerCard from './CareerCard';
import SearchBar from './../../components/SearchBar';
import LoadingSpinner from './../../components/LoadingSpinner';
const CareerList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { careers, loading, error } = useAppSelector((state) => state.careers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    dispatch(loadCareers());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      dispatch(loadCareers());
    } else {
      dispatch(searchCareerList(query));
    }
  };

  const handleShowRecommended = () => {
    // In a real app, you would get user skills from the state or API
    const userSkills = ['JavaScript', 'React', 'Python'];
    dispatch(loadRecommendedCareers(userSkills));
    setShowRecommended(true);
  };

  const handleShowAll = () => {
    dispatch(loadCareers());
    setShowRecommended(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">
          {showRecommended ? 'Recommended Careers' : 'All Career Paths'}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={handleShowRecommended}
            className={`px-4 py-2 rounded ${showRecommended ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={showRecommended}
          >
            Get Recommendations
          </button>
          <button
            onClick={handleShowAll}
            className={`px-4 py-2 rounded ${!showRecommended ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={!showRecommended}
          >
            Show All
          </button>
        </div>
      </div>

      <SearchBar 
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search careers..."
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career: Career) => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>

      {careers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No careers found {searchQuery ? `for "${searchQuery}"` : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default CareerList;