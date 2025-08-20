// // File: src/services/api.js
// // Purpose: This file creates a centralized and configured Axios instance.
// // It uses an interceptor to automatically add the JWT to the header of every request.

// import api from './api';

// // --- User Management ---
// const getPendingUsers = () => {
//     return api.get('/admin/users/pending');
// };

// const approveUser = (userId) => {
//     return api.put(`/admin/users/${userId}/approve`);
// };

// const rejectUser = (userId) => {
//     return api.delete(`/admin/users/${userId}/reject`);
// };

// // --- Booking Management ---
// const getAdminPendingBookings = () => {
//     return api.get('/admin/bookings/pending'); // Assumes this endpoint exists
// };

// const confirmBooking = (bookingId, hallId) => {
//     return api.put(`/admin/bookings/${bookingId}/confirm`, { hallId }); // Assumes this endpoint exists
// };

// const adminService = {
//     getPendingUsers,
//     approveUser,
//     rejectUser,
//     getAdminPendingBookings,
//     confirmBooking
// };

// export default adminService;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
  }
);

export default api;