import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const VerifyEmailPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [resending, setResending] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No verification token found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/auth/verify-email/${token}`);
        setMessage(response.data.message);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'An error occurred during email verification.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  const handleResendVerificationEmail = async () => {
    setResending(true);
    setError(null);
    setMessage(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('You must be logged in to request a new verification email.');
        setResending(false);
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/auth/request-verification-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while resending the verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Email Verification</h1>
        {loading && <LoadingSpinner />}
        {message && (
          <div>
            <p className="text-green-400 mb-4">{message}</p>
            <Link to="/login" className="text-blue-400 hover:underline">
              Proceed to Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-gray-300 mb-4">
              If you believe this is an error, please contact support or try requesting a new verification email.
            </p>
            <button
              onClick={handleResendVerificationEmail}
              disabled={resending}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50"
            >
              {resending ? 'Resending...' : 'Resend Verification Email'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;