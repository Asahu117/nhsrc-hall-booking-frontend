
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PublicHomePage from './pages/PublicHomePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* --- Standalone Public Routes (with their own full-page visuals) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* --- Public Home Page (Wrapped in the visual PublicLayout) --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<PublicHomePage />} />
      </Route>

      {/* --- Protected Routes (Wrapped in the simple DashboardLayout) --- */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      
      {/* --- System Routes --- */}
      <Route path="/unauthorized" element={<div className="text-center p-10"><h1>Unauthorized</h1></div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;