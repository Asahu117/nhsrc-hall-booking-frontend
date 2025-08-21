

// File: src/components/LoginModal.jsx
// UPDATED: Added the email auto-suggest feature.

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import LoginImageSlideshow from './LoginImageSlideshow';

// SVG Icons for the form fields
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2l7.997 3.884A2 2 0 0019 7.616V16a2 2 0 01-2 2H3a2 2 0 01-2-2V7.616a2 2 0 001.003-1.732zM10 4.218L4.218 7 10 9.782 15.782 7 10 4.218zM4 16V9.218l6 2.909 6-2.909V16H4z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const { login } = useAuth();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.includes('@') && !value.split('@')[1]) {
        const emailUser = value.split('@')[0];
        setEmailSuggestions([`${emailUser}@nhsrcindia.org`, `${emailUser}@nhsrcindiaextn.org`]);
    } else {
        setEmailSuggestions([]);
    }
  };

  const selectSuggestion = (value) => {
    setEmail(value);
    setEmailSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both Email and Password.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputBaseStyle = "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl z-20 md:text-white">&times;</button>
        
        <div className="flex flex-col justify-center p-8">
          <div className="text-center">
            <Link to="/" onClick={onClose}>
              <img src="/public/assets/images/login/nhscr-logo_1.png" alt="NHSRC Logo" className="w-32 mx-auto mb-4" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
            <p className="mt-2 text-gray-600">Access your dashboard</p>
          </div>
          {error && <div className="p-3 mt-4 text-sm text-center text-red-800 bg-red-100 rounded-lg">{error}</div>}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><EmailIcon /></div>
              <input type="email" id="email" value={email} onChange={handleEmailChange} className={inputBaseStyle} placeholder="Email Address" disabled={loading} />
              {emailSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {emailSuggestions.map(s => <li key={s} onClick={() => selectSuggestion(s)} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{s}</li>)}
                </ul>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><LockIcon /></div>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputBaseStyle} placeholder="Password" disabled={loading} />
            </div>
            <button type="submit" className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
              {loading ? <SpinnerIcon /> : 'Sign In'}
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-700">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="font-medium text-blue-700 hover:underline">Register here</button>
          </p>
        </div>
        
        <div className="hidden md:block">
          <LoginImageSlideshow />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;