// src/features/auth/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { FaArrowRight, FaGithub } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const { login, loading, user } = useAuth(); // Use useAuth hook
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Local error state

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Redirect if user is already logged in
    }
  }, [user, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage(null); // Clear error on input change
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors

    try {
      await login(email, password);
      // Redirection to dashboard is handled inside AuthContext on successful login
    } catch (error: any) {
      setErrorMessage(error.response?.data?.detail || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Glass Card Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
          {/* Brand Header */}
          {/* <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="bg-cyan-500 w-10 h-10 rounded-full flex items-center justify-center">
                <div className="text-gray-900 font-bold text-lg">CF</div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                CareerForge<span className="text-cyan-300">.ai</span>
              </span>
            </div>
          </div> */}

          <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Sign in to continue your career journey
          </p>

          {/* Social Login Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center py-3 bg-slate-700/50 rounded-xl border border-slate-600 hover:bg-slate-700 transition-all group">
              <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  fill="currentColor"
                />
              </svg>
              <span>Google</span>
            </button>
            <button className="flex-1 flex items-center justify-center py-3 bg-slate-700/50 rounded-xl border border-slate-600 hover:bg-slate-700 transition-all group">
              <FaGithub className="text-gray-300 group-hover:text-white mr-2" />
              <span>GitHub</span>
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="mx-4 text-slate-500 text-sm">OR SIGN IN WITH EMAIL</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          {/* Form */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700/50 rounded-lg text-red-300 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all"
                required
                minLength={6}
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-slate-400">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/30"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}