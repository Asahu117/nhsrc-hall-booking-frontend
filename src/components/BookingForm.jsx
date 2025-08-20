

// File: src/components/BookingForm.jsx
// UPDATED: Refactored with Tailwind CSS for a professional look.

import React, { useState } from 'react';
import bookingService from '../services/bookingService';

const BookingForm = ({ halls, meetingTypes, onBookingCreated }) => {
  const [hallId, setHallId] = useState('');
  const [meetingTypeId, setMeetingTypeId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!meetingTypeId || !purpose || !startTime || !endTime) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      const bookingData = {
        hallId: hallId ? parseInt(hallId, 10) : null,
        meetingTypeId: parseInt(meetingTypeId, 10),
        purpose,
        startTime,
        endTime,
      };
      const response = await bookingService.createBooking(bookingData);
      setSuccess('Booking request created successfully!');
      onBookingCreated(response.data);
      // Clear form
      setHallId('');
      setMeetingTypeId('');
      setPurpose('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please check the time slot.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Base input style for consistency
  const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Create a New Booking</h2>
      
      {error && <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg">{error}</div>}
      {success && <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-lg">{success}</div>}

      <div>
        <label htmlFor="purpose" className="block mb-2 text-sm font-medium text-gray-700">Purpose / Agenda *</label>
        <textarea id="purpose" value={purpose} onChange={e => setPurpose(e.target.value)} className={inputStyle} rows="3" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
            <label htmlFor="meetingType" className="block mb-2 text-sm font-medium text-gray-700">Meeting Type *</label>
            <select id="meetingType" value={meetingTypeId} onChange={e => setMeetingTypeId(e.target.value)} className={inputStyle}>
                <option value="">Select a type...</option>
                {meetingTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="hall" className="block mb-2 text-sm font-medium text-gray-700">Preferred Hall (Optional)</label>
            <select id="hall" value={hallId} onChange={e => setHallId(e.target.value)} className={inputStyle}>
                <option value="">Select a hall...</option>
                {halls.map(hall => <option key={hall.id} value={hall.id}>{hall.name}</option>)}
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
            <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-700">Start Time *</label>
            <input type="datetime-local" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} className={inputStyle} />
        </div>
        <div>
            <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-700">End Time *</label>
            <input type="datetime-local" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} className={inputStyle} />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default BookingForm;