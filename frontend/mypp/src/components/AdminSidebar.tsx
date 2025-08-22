import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '../store/store'; // Assuming RootState is defined here or similar

const AdminSidebar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth); // Get user from Redux state

  if (!user || user.role !== 'admin') {
    return null; // Don't render if not admin
  }

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <ul>
        <li className="mb-2"><a href="/admin/dashboard" className="hover:text-gray-300">Dashboard</a></li>
        <li className="mb-2"><a href="/admin/users" className="hover:text-gray-300">Users</a></li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;