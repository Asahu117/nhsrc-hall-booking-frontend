import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gray-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
          alt="Conference room"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1920x480/000000/FFFFFF?text=Welcome'; }}
        />
        <div className="absolute inset-0 bg-gray-700 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Hall Booking Portal
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
          Welcome to the NHSRC conference hall booking and management system.
        </p>
      </div>
    </div>
  );
};

export default Hero;