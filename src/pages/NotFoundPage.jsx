

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-2xl font-medium text-gray-800">Page Not Found</p>
        <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
        <Link to="/dashboard" className="px-6 py-2 mt-6 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Go to Dashboard</Link>
    </div>
  );
};

export default NotFoundPage;