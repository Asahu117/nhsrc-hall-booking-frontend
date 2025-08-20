

import React from 'react';

const MyBookingsList = ({ bookings }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-green-600';
      case 'PENDING_APPROVAL':
      case 'PENDING_ADMIN_CONFIRMATION':
        return 'text-yellow-600';
      case 'REJECTED':
      case 'CANCELLED':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">My Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map(booking => (
            <li key={booking.id} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <div className="font-semibold text-gray-800">{booking.purpose}</div>
              <div className="text-sm text-gray-600">
                {booking.hallName || 'Hall Pending Assignment'}
              </div>
              <div className={`mt-1 text-sm font-bold ${getStatusColor(booking.status)}`}>
                {booking.status.replace(/_/g, ' ')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsList;