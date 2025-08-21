

// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const ProtectedRoute = ({ children, roles }) => {
//   const { user } = useAuth();
//   const location = useLocation();
//   if (!user) return <Navigate to="/" state={{ from: location }} replace />;
//   if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
//   return children;
// };

// export default ProtectedRoute;

// File: src/components/ProtectedRoute.jsx
// UPDATED: Now waits for the AuthContext to initialize before checking for a user.

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isInitializing } = useAuth(); // Get the new loading state
  const location = useLocation();

  // If the context is still checking for a user, show a loading message.
  // This is the key change that prevents the premature redirect.
  if (isInitializing) {
    return <div className="text-center p-10">Loading session...</div>;
  }

  // After initialization, if there is no user, redirect to the login page.
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If the user exists but doesn't have the required role, redirect.
  if (roles && !roles.some(role => role.toLowerCase() === user.role.toLowerCase())) {
  return <Navigate to="/unauthorized" replace />;
}

  // If everything is fine, render the requested component.
  return children;
};

export default ProtectedRoute;