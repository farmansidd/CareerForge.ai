// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth); // Get user from Redux state

  return user ? children : <Navigate to="/login" replace />;
}