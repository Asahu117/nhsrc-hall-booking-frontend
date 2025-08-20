// import api from './api';

// const getPendingUsers = () => {
//     return api.get('/admin/users/pending'); // Assumes this backend endpoint exists
// };

// const approveUser = (userId) => {
//     return api.put(`/admin/users/${userId}/approve`); // Assumes this backend endpoint exists
// };

// const rejectUser = (userId) => {
//     return api.delete(`/admin/users/${userId}/reject`); // Assumes this backend endpoint exists
// };

// const adminService = {
//     getPendingUsers,
//     approveUser,
//     rejectUser,
// };

// export default adminService;


import api from './api';

const getPendingUsers = () => api.get('/admin/users/pending');
const approveUser = (userId) => api.put(`/admin/users/${userId}/approve`);
const rejectUser = (userId) => api.delete(`/admin/users/${userId}/reject`);
const getAdminPendingBookings = () => api.get('/admin/bookings/pending');
const confirmBooking = (bookingId, hallId) => api.put(`/admin/bookings/${bookingId}/confirm`, { hallId });

export default { getPendingUsers, approveUser, rejectUser, getAdminPendingBookings, confirmBooking };
