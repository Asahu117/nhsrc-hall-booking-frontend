

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const HamburgerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>;

const Navbar = ({ onMenuClick, onLoginClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className=" w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-md sticky top-0 z-20 border-b border-blue-100">
   {/* <header className="w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 shadow-md sticky top-0 z-20 border-b border-blue-100"> */}

      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center space-x-4">
            {/* Hamburger button - only visible on small screens for logged-in users */}
            {user && (
              <button onClick={onMenuClick} className="text-gray-500 focus:outline-none lg:hidden">
                <HamburgerIcon />
              </button>
            )}
            
          
            <Link to={user ? "/home" : "/"} className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <img 
                className="h-12 w-auto drop-shadow-md" 
                src="/assets/images/login/nhsrc-logo.png" 
                alt="NHSRC Logo"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x50/000000/FFFFFF?text=Logo'; }}
              />
              <span className="hidden sm:inline text-xl font-bold text-gray-800">NHSRC Conference Hall System</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Profile + Welcome */}
                <div className="hidden md:flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Welcome, {user.fullName}
                  </span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <Bell className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-white">5</span>
                  </span>
                </button>

                {/* Logout */}
                <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={onLoginClick} className="px-4 py-2 text-sm font-medium bg-red-600 border border-red-600 rounded-md hover:bg-blue-50">
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;