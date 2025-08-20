import React from 'react';
import { useAuth } from '../hooks/useAuth';
import EmployeeDashboard from '../components/dashboards/EmployeeDashboard';
import ApproverDashboard from '../components/dashboards/ApproverDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';

const HomePage = () => {
  const { user } = useAuth();

  // Render the correct dashboard based on the user's role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'EMPLOYEE':
        return <EmployeeDashboard />;
      case 'MID_USER_APPROVER':
        return <ApproverDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        // You can return a loading spinner or a default message here
        return <p className="text-center p-10">Loading dashboard...</p>;
    }
  };

  return (
    <div>
      {renderDashboard()}
    </div>
  );
};

export default HomePage;