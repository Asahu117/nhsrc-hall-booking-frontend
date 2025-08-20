

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ParticleBackground from '../components/ParticleBackground';
import LoginImageSlideshow from '../components/LoginImageSlideshow';
import Footer from '../components/Footer'; // Import the Footer

const IdCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2l7.997 3.884A2 2 0 0019 7.616V16a2 2 0 01-2 2H3a2 2 0 01-2-2V7.616a2 2 0 001.003-1.732zM10 4.218L4.218 7 10 9.782 15.782 7 10 4.218zM4 16V9.218l6 2.909 6-2.909V16H4z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!employeeId || !password) {
      setError('Please enter both Employee ID and Password.');
      return;
    }
    setLoading(true);
    try {
      await login(employeeId, password);
    } catch (err) {
      setError('Login failed. Please check your credentials or account status.');
    } finally {
      setLoading(false);
    }
  };

  const inputBaseStyle = "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white bg-opacity-75 backdrop-blur-sm transition-colors text-gray-900 placeholder-gray-500 caret-blue-600";

  return (
    <div className="relative flex flex-col min-h-screen">
      <ParticleBackground />
      <div className="flex-grow flex items-center justify-center">
        <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 bg-black bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Panel: Form */}
          <div className="flex flex-col justify-center p-8">
            <div className="text-center">
              <Link to="/">
                <img src="/public/assets/images/login/nhscr-logo_1.png" alt="NHSRC Logo" className="w-32 mx-auto mb-4 cursor-pointer" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">Hall Booking Portal</h1>
              <p className="mt-2 text-gray-600">Please sign in to continue</p>
            </div>
            {error && <div className="p-3 mt-4 text-sm text-center text-red-800 bg-red-100 rounded-lg">{error}</div>}
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><IdCardIcon /></div>
                <input type="text" id="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className={inputBaseStyle} placeholder="Employee ID" disabled={loading} />
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
              <Link to="/register" className="font-medium text-blue-700 hover:underline">Register here</Link>
            </p>
          </div>
          {/* Right Panel: Image Slideshow */}
          <div className="hidden md:block">
            <LoginImageSlideshow />
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
