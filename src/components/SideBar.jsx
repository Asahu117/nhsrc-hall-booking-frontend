


import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// (SVG Icons would be here)
const HomeIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon = () => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const baseStyle = "flex items-center p-4 my-2 transition-colors duration-200 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-lg";
  const activeStyle = "bg-blue-100 text-blue-600";

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-white shadow-xl transform transition-transform lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center  shadow-md px-4">
          {/* ... Logo ... */}
        </div>
        <nav className="mt-5 px-4">
          <NavLink to="/home" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : ''}`}>
            <HomeIcon />
            <span className="mx-4 font-normal">Home</span>
          </NavLink>

          {(user?.role === 'ADMIN' || user?.role === 'MID_USER_APPROVER') && (
            <NavLink to="/user-management" className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : ''}`}>
              <UsersIcon />
              <span className="mx-4 font-normal">User Management</span>
            </NavLink>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;