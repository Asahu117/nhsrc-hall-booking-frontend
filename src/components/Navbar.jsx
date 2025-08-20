
// File: src/components/Navbar.jsx
// UPDATED: Corrected the image URL syntax.

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, onSignUpClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to={user ? "/home" : "/"} className="flex items-center space-x-3">
            <img className="h-12 w-auto" src="/public/assets/images/login/nhscr-logo_1.png" alt="NHSRC Logo" />
            <span className="hidden sm:inline text-xl font-bold text-gray-800">NHSRC Booking</span>
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-gray-700">Welcome, {user.employeeId}!</span>
                <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Logout</button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={onLoginClick} className="px-4 py-2 text-sm font-medium text-blue-100  bg-blue-600  border border-blue-600 rounded-md hover:bg-red-600">Sign In</button>
                <button onClick={onSignUpClick} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;