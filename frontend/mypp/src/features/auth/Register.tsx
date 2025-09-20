// src/features/auth/Register.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../store/store';

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordCriteria = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      checkPasswordCriteria(value);
    }

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!passwordCriteria.length || !passwordCriteria.uppercase || !passwordCriteria.lowercase || !passwordCriteria.number || !passwordCriteria.special) {
      newErrors.password = 'Password does not meet the requirements';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    
    if (!validateForm()) {
      return;
    }

    const resultAction = await dispatch(register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    }));
    
    if (register.fulfilled.match(resultAction)) {
      setSuccessMessage('Please check your mailbox and confirm your registration. You can log in after verification.');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
          
          <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Create Your Account
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Start your career journey with AI-powered guidance
          </p>

          {isError && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700/50 rounded-lg text-red-300 text-center">
              {message === 'User already exists' ? (
                <>
                  User already exists. Please <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">Sign In</Link>.
                </>
              ) : (
                message
              )}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-700/50 rounded-lg text-green-300 text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all"
              />
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.243c-.362-.74-.9-1.382-1.55-1.972l-2.58-2.58A.75.75 0 0 0 15.25 8l-1.47-1.47a.75.75 0 0 0-1.06-1.06L5.57 2.22ZM9 12.25A3.25 3.25 0 0 0 12.25 9l-3.25 3.25Z" />
                    <path d="M15 12a3 3 0 0 1-3 3l-1.75-1.75a.75.75 0 0 0-1.06-1.06L5.57 8.57A3 3 0 0 1 9 5.57l4.43 4.43A3.07 3.07 0 0 1 15 12Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            {errors.password && <p className="text-red-400 text-sm -mt-2">{errors.password}</p>}
            <div className="text-xs text-slate-400 px-4 -mt-2">
              <p className="mb-1">Password must include:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className={`flex items-center ${passwordCriteria.length ? 'text-green-400' : ''}`}>
                  {passwordCriteria.length ? '✓' : '○'} At least 8 characters
                </li>
                <li className={`flex items-center ${passwordCriteria.uppercase ? 'text-green-400' : ''}`}>
                  {passwordCriteria.uppercase ? '✓' : '○'} One uppercase letter
                </li>
                <li className={`flex items-center ${passwordCriteria.lowercase ? 'text-green-400' : ''}`}>
                  {passwordCriteria.lowercase ? '✓' : '○'} One lowercase letter
                </li>
                <li className={`flex items-center ${passwordCriteria.number ? 'text-green-400' : ''}`}>
                  {passwordCriteria.number ? '✓' : '○'} One number
                </li>
                <li className={`flex items-center ${passwordCriteria.special ? 'text-green-400' : ''}`}>
                  {passwordCriteria.special ? '✓' : '○'} One special character
                </li>
              </ul>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 bg-slate-800/70 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-white transition-all"
              />
               <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.243c-.362-.74-.9-1.382-1.55-1.972l-2.58-2.58A.75.75 0 0 0 15.25 8l-1.47-1.47a.75.75 0 0 0-1.06-1.06L5.57 2.22ZM9 12.25A3.25 3.25 0 0 0 12.25 9l-3.25 3.25Z" />
                    <path d="M15 12a3 3 0 0 1-3 3l-1.75-1.75a.75.75 0 0 0-1.06-1.06L5.57 8.57A3 3 0 0 1 9 5.57l4.43 4.43A3.07 3.07 0 0 1 15 12Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-sm -mt-2">{errors.confirmPassword}</p>}

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-cyan-500 bg-slate-800 border-slate-700 rounded focus:ring-cyan-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-slate-400">
                I agree to the <a href="/terms" className="text-cyan-400 hover:text-cyan-300">Terms</a> and <a href="/privacy" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
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
