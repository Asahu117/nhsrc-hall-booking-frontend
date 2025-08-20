import React, { useState, useEffect, useCallback } from 'react';
import bookingService from '../../services/bookingService';

const ApproverDashboard = () => {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPendingBookings = useCallback(async () => {
        try {
            setLoading(true);
            const response = await bookingService.getPendingApprovals();
            setPendingBookings(response.data);
        } catch (err) {
            setError('Failed to fetch pending approvals.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPendingBookings();
    }, [fetchPendingBookings]);

    const handleApprove = async (bookingId) => {
        if(window.confirm('Are you sure?')) {
            await bookingService.approveBooking(bookingId);
            fetchPendingBookings();
        }
    };

    const handleReject = async (bookingId) => {
        const reason = prompt('Reason for rejection:');
        if (reason) {
            await bookingService.rejectBooking(bookingId, reason);
            fetchPendingBookings();
        }
    };

    return (
        <div className="py-10">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-900">Pending Booking Requests</h3>
                    {loading && <p className="mt-4 text-center">Loading...</p>}
                    {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                    {!loading && pendingBookings.length === 0 && <p className="mt-4 text-gray-500">No pending requests.</p>}
                    <div className="mt-6 space-y-4">
                        {pendingBookings.map(booking => (
                            <div key={booking.id} className="p-4 border rounded-md sm:flex sm:items-center sm:justify-between">
                                <div className="text-sm text-gray-600">
                                    <p><strong>Requester:</strong> {booking.requesterName}</p>
                                    <p><strong>Purpose:</strong> {booking.purpose}</p>
                                    <p><strong>Time:</strong> {new Date(booking.startTime).toLocaleString()} to {new Date(booking.endTime).toLocaleString()}</p>
                                </div>
                                <div className="flex gap-2 mt-4 sm:mt-0">
                                    <button onClick={() => handleApprove(booking.id)} className="px-3 py-1 text-sm text-white bg-green-600 rounded-md">Approve</button>
                                    <button onClick={() => handleReject(booking.id)} className="px-3 py-1 text-sm text-white bg-red-600 rounded-md">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApproverDashboard;