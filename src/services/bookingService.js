// // File: src/services/bookingService.js
// // Purpose: This file centralizes all API calls related to bookings.

import api from './api';

const getMyBookings = () => api.get('/bookings');
const createBooking = (bookingData) => api.post('/bookings', bookingData);
const getAllConfirmedBookings = () => api.get('/bookings/confirmed');
const getPendingApprovals = () => api.get('/bookings/pending-approval');
const approveBooking = (bookingId) => api.put(`/bookings/${bookingId}/approve`);
const rejectBooking = (bookingId, reason) => api.put(`/bookings/${bookingId}/reject`, { comments: reason });

export default { getMyBookings, createBooking, getAllConfirmedBookings, getPendingApprovals, approveBooking, rejectBooking };
