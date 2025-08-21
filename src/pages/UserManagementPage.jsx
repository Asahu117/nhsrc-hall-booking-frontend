

// File: src/pages/UserManagementPage.jsx
// UPDATED: Now includes the button to open the "Create User" modal.

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import CreateUserModal from '../components/CreateUserModal';

const UserManagementPage = () => {
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]); // To store the list of managed users

  const handleUserCreated = (newUser) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="mt-2 text-gray-600">
            {user?.role === 'ADMIN' ? 'Create and manage Mid-User Approvers.' : 'Create and manage Employees.'}
          </p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Add New User
        </button>
      </div>
      
      <div className="mt-8">
        {/* A placeholder for the list of users */}
        <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Managed Users</h3>
            {users.length === 0 ? (
                <p className="mt-4 text-gray-500">No users created yet.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {users.map(u => (
                        <li key={u.id} className="py-3">{u.fullName} - {u.email}</li>
                    ))}
                </ul>
            )}
        </div>
      </div>

      <CreateUserModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        onUserCreated={handleUserCreated}
        userRole={user?.role}
      />
    </div>
  );
};

export default UserManagementPage;