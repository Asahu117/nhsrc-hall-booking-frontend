// File: src/components/dashboards/AdminDashboard.jsx
// Purpose: New component for the Admin's UI.
// This code is moved from the old AdminPage.jsx.

import React, { useState, useEffect, useCallback } from 'react';
import adminService from '../../services/adminService';
import hallService from '../../services/hallService';
import UserManagement from '../UserManagement';
import BookingManagement from '../BookingManagement';

const AdminDashboard = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('bookings');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [usersRes, bookingsRes, hallsRes] = await Promise.all([
                adminService.getPendingUsers(),
                adminService.getAdminPendingBookings(),
                hallService.getAllHalls()
            ]);
            setPendingUsers(usersRes.data);
            setPendingBookings(bookingsRes.data);
            setHalls(hallsRes.data);
        } catch (err) {
            setError('Failed to fetch admin data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUserAction = () => adminService.getPendingUsers().then(res => setPendingUsers(res.data));
    const handleBookingAction = () => adminService.getAdminPendingBookings().then(res => setPendingBookings(res.data));
    
    const tabStyle = "px-4 py-2 text-sm font-medium rounded-md";
    const activeTabStyle = "bg-blue-600 text-white";
    const inactiveTabStyle = "text-gray-600 bg-gray-200 hover:bg-gray-300";

    return (
        <div className="py-10">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex space-x-4 mb-6">
                    <button onClick={() => setActiveTab('bookings')} className={`${tabStyle} ${activeTab === 'bookings' ? activeTabStyle : inactiveTabStyle}`}>Booking Management</button>
                    <button onClick={() => setActiveTab('users')} className={`${tabStyle} ${activeTab === 'users' ? activeTabStyle : inactiveTabStyle}`}>User Management</button>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-center text-red-600">{error}</p>}
                    {!loading && activeTab === 'bookings' && (
                        <BookingManagement bookings={pendingBookings} halls={halls} onAction={handleBookingAction} />
                    )}
                    {!loading && activeTab === 'users' && (
                        <UserManagement users={pendingUsers} onApprove={handleUserAction} onReject={handleUserAction} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;