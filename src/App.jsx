

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PublicHomePage from './pages/PublicHomePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import NotFoundPage from './pages/NotFoundPage';
import SetPasswordPage from './pages/SetPasswordPage';
import UserManagementPage from './pages/UserManagementPage'; // Import the new page

function App() {
  return (
    <Routes>
      {/* --- Standalone Public Routes --- */}
     
      <Route path="/set-password" element={<SetPasswordPage />} />

      {/* --- Public Home Page (Wrapped in the visual PublicLayout) --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicHomePage />} />
      </Route>

      {/* --- Protected Routes (Wrapped in the new DashboardLayout) --- */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
        <Route 
          path="/user-management" 
          element={
            <ProtectedRoute roles={['ADMIN', 'MID_USER_APPROVER']}>
              <UserManagementPage />
            </ProtectedRoute>
          } 
        />
      </Route>
      
      {/* --- System Routes --- */}
      <Route path="/unauthorized" element={<div className="text-center p-10"><h1>Unauthorized</h1></div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;