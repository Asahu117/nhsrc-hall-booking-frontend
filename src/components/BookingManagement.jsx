
// File: src/components/BookingManagement.jsx
// Purpose: New component for the admin to manage booking requests.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import adminService from '../services/adminService';

const BookingManagement = ({ bookings, halls, onAction }) => {
    const [selectedHall, setSelectedHall] = useState({});

    const handleConfirm = async (bookingId) => {
        const hallId = selectedHall[bookingId];
        if (!hallId) {
            alert('Please select a hall to confirm the booking.');
            return;
        }
        try {
            await adminService.confirmBooking(bookingId, hallId);
            onAction(); // Refresh the list in the parent component
        } catch (err) {
            alert('Failed to confirm booking. The time slot may have been taken.');
            console.error(err);
        }
    };
    
    // Simplified styles for brevity
    const styles = {
        bookingItem: { borderBottom: '1px solid #eee', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' },
        actions: { display: 'flex', gap: '10px', alignItems: 'center' },
        confirmButton: { backgroundColor: '#1890ff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' },
        select: { padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9' }
    };

    return (
        <div>
            <h3>Bookings Pending Final Confirmation</h3>
            {bookings.length === 0 ? (
                <p>No bookings are awaiting final confirmation.</p>
            ) : (
                <div>
                    {bookings.map(booking => (
                        <div key={booking.id} style={styles.bookingItem}>
                            <div>
                                <p><strong>Requester:</strong> {booking.requesterName}</p>
                                <p><strong>Purpose:</strong> {booking.purpose}</p>
                                <p><strong>Time:</strong> {new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}</p>
                                <p><strong>Preferred Hall:</strong> {booking.hallName || 'None'}</p>
                            </div>
                            <div style={styles.actions}>
                                <select 
                                    style={styles.select}
                                    defaultValue={booking.hallId || ""}
                                    onChange={(e) => setSelectedHall({...selectedHall, [booking.id]: e.target.value})}
                                >
                                    <option value="">Assign a Hall...</option>
                                    {halls.map(hall => (
                                        <option key={hall.id} value={hall.id}>{hall.name}</option>
                                    ))}
                                </select>
                                <button onClick={() => handleConfirm(booking.id)} style={styles.confirmButton}>Confirm</button>
                                {/* TODO: Add Reject button functionality */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ✅ PropTypes validation for SonarQube
BookingManagement.propTypes = {
    bookings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            requesterName: PropTypes.string.isRequired,
            purpose: PropTypes.string.isRequired,
            startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
            endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
            hallName: PropTypes.string,
            hallId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    halls: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    onAction: PropTypes.func.isRequired,
};

// ✅ Default props to prevent undefined errors
BookingManagement.defaultProps = {
    bookings: [],
    halls: [],
};

export default BookingManagement;
