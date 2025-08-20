import React, { useState, useEffect, useCallback } from 'react';
import hallService from '../../services/hallService';
import bookingService from '../../services/bookingService';
import masterDataService from '../../services/masterDataService';
import MyBookingsList from '../MyBookingsList';
import BookingForm from '../BookingForm';
import BookingCalendar from '../BookingCalendar';

const EmployeeDashboard = () => {
  const [halls, setHalls] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [meetingTypes, setMeetingTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [hallsRes, myBookingsRes, allBookingsRes, meetingTypesRes] = await Promise.all([
        hallService.getAllHalls(),
        bookingService.getMyBookings(),
        bookingService.getAllConfirmedBookings(),
        masterDataService.getMeetingTypes()
      ]);
      setHalls(hallsRes.data);
      setMyBookings(myBookingsRes.data);
      setAllBookings(allBookingsRes.data);
      setMeetingTypes(meetingTypesRes.data);
    } catch (err) {
      setError('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBookingCreated = (newBooking) => {
    setMyBookings(prevBookings => [newBooking, ...prevBookings]);
    bookingService.getAllConfirmedBookings().then(res => setAllBookings(res.data));
  };

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900">Hall Availability</h2>
              <div className="mt-4">
                <BookingCalendar bookings={allBookings} />
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-white rounded-lg shadow">
                <BookingForm halls={halls} meetingTypes={meetingTypes} onBookingCreated={handleBookingCreated} />
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <MyBookingsList bookings={myBookings} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;