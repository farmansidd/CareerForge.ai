import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCertification, updateCertification, removeCertification } from './resumeSlice';
import { FaTrophy, FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

const CertificationsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const certifications = useAppSelector((state) => state.resume.certifications);

  const handleAddCertification = () => {
    dispatch(addCertification());
  };

  const handleRemoveCertification = (id: string) => {
    dispatch(removeCertification(id));
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateCertification({ id, data: { [name]: value } }));
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center"><FaTrophy className="mr-3 text-blue-300"/>Certifications & Achievements</h3>
      {certifications.map((cert) => (
        <div key={cert.id} className="mb-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={cert.name} onChange={(e) => handleChange(cert.id, e)} placeholder="Certification or Achievement" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="issuer" value={cert.issuer} onChange={(e) => handleChange(cert.id, e)} placeholder="Issuer (e.g., Coursera)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="date" value={cert.date} onChange={(e) => handleChange(cert.id, e)} placeholder="Date (e.g., May 2023)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
            <input type="text" name="url" value={cert.url} onChange={(e) => handleChange(cert.id, e)} placeholder="Credential URL (Optional)" className="p-3 rounded bg-gray-700/30 text-gray-900 placeholder-gray-600 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200" />
          </div>
          <button onClick={() => handleRemoveCertification(cert.id)} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
            <Trash2 className="w-4 h-4 mr-2" /> Remove
            </button>
        </div>
      ))}
      <button onClick={handleAddCertification} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition-all duration-200">
        <FaPlus className="mr-2" /> Add Certification
        </button>
    </div>
  );
};

export default CertificationsForm;