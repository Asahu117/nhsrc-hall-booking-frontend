// File: src/pages/PublicHomePage.jsx
// Purpose: This is the main public landing page.

import React from 'react';
import { useOutletContext } from 'react-router-dom';

const PublicHomePage = () => {
  const { openLoginModal } = useOutletContext();

  return (
    <div className="py-20 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Streamline Your Bookings</h2>
      <p className="mt-4 text-lg text-gray-600">The official portal for booking conference halls at NHSRC.</p>
      <button 
        onClick={openLoginModal} 
        className="inline-block px-8 py-3 mt-8 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Get Started
      </button>
    </div>
  );
};

export default PublicHomePage;