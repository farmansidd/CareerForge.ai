// src/routes/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector

export default function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth); // Get user from Redux state

  // Check if user exists and if their role is 'admin'
  const isAdmin = user && user.role === 'admin';

  return isAdmin ? children : <Navigate to="/unauthorized" replace />;
}