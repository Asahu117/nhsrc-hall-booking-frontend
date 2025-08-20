
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BookingCalendar = ({ bookings }) => {
  const events = bookings.map(booking => ({
    id: booking.id,
    title: `${booking.hallName}: ${booking.purpose}`,
    start: new Date(booking.startTime),
    end: new Date(booking.endTime),
  }));
  return (
    <div style={{ height: '500px' }}><Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" /></div>
  );
};

export default BookingCalendar;