import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockFlights, mockBookings as initialMockBookings } from '../data/mockData';

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize flights from mock data
    const savedFlights = JSON.parse(localStorage.getItem('ohana_flights') || 'null');
    if (savedFlights && savedFlights.length > 0) {
      setFlights(savedFlights);
    } else {
      setFlights(mockFlights);
      localStorage.setItem('ohana_flights', JSON.stringify(mockFlights));
    }

    // Initialize bookings
    const savedBookings = JSON.parse(localStorage.getItem('ohana_bookings') || 'null');
    if (savedBookings && savedBookings.length > 0) {
      setBookings(savedBookings);
    } else {
      setBookings(initialMockBookings);
      localStorage.setItem('ohana_bookings', JSON.stringify(initialMockBookings));
    }

    setLoading(false);
  }, []);

  const bookFlight = (bookingData) => {
    try {
      // Find the flight details
      const flight = flights.find(f => f.id === bookingData.flightId);
      if (!flight) {
        return { success: false, error: 'Flight not found' };
      }

      // Check seat availability
      if (flight.availableSeats < bookingData.passengers) {
        return { success: false, error: 'Not enough seats available' };
      }

      // Create new booking
      const newBooking = {
        id: Date.now(),
        ...bookingData,
        flight: {
          id: flight.id,
          flightNumber: flight.flightNumber,
          airline: flight.airline,
          origin: flight.origin,
          destination: flight.destination,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          date: flight.date,
          duration: flight.duration,
          aircraft: flight.aircraft,
          status: flight.status,
          image: flight.image
        },
        status: 'confirmed',
        bookingDate: new Date().toISOString().split('T')[0],
        bookingReference: `OH${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      // Update bookings
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      localStorage.setItem('ohana_bookings', JSON.stringify(updatedBookings));

      // Update available seats
      const updatedFlights = flights.map(f =>
        f.id === bookingData.flightId
          ? { ...f, availableSeats: f.availableSeats - bookingData.passengers }
          : f
      );
      setFlights(updatedFlights);
      localStorage.setItem('ohana_flights', JSON.stringify(updatedFlights));

      return { success: true, booking: newBooking };
    } catch (error) {
      console.error('Booking error:', error);
      return { success: false, error: 'Failed to create booking' };
    }
  };

  const cancelBooking = (bookingId, userId) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      
      if (!booking) {
        return { success: false, error: 'Booking not found' };
      }

      // Verify user owns this booking (unless they're an admin)
      if (booking.userId !== userId) {
        return { success: false, error: 'Unauthorized: You can only cancel your own bookings' };
      }

      // Restore seats
      const updatedFlights = flights.map(flight =>
        flight.id === booking.flightId
          ? { ...flight, availableSeats: flight.availableSeats + booking.passengers }
          : flight
      );
      setFlights(updatedFlights);
      localStorage.setItem('ohana_flights', JSON.stringify(updatedFlights));

      // Cancel booking
      const updatedBookings = bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem('ohana_bookings', JSON.stringify(updatedBookings));

      return { success: true };
    } catch (error) {
      console.error('Cancel booking error:', error);
      return { success: false, error: 'Failed to cancel booking' };
    }
  };

  const updateBooking = (bookingId, updates, userId, isAdmin = false) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      
      if (!booking) {
        return { success: false, error: 'Booking not found' };
      }

      // Check authorization
      if (!isAdmin && booking.userId !== userId) {
        return { success: false, error: 'Unauthorized: You can only update your own bookings' };
      }

      const updatedBookings = bookings.map(b =>
        b.id === bookingId ? { ...b, ...updates } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem('ohana_bookings', JSON.stringify(updatedBookings));
      
      return { success: true };
    } catch (error) {
      console.error('Update booking error:', error);
      return { success: false, error: 'Failed to update booking' };
    }
  };

  // Admin-only flight management functions
  const addFlight = (flightData, userRole) => {
    if (userRole !== 'admin') {
      return { success: false, error: 'Unauthorized: Admin access required' };
    }

    try {
      const newFlight = {
        id: Date.now(),
        ...flightData,
        airline: 'Ohana Airlines',
        availableSeats: parseInt(flightData.seatCapacity),
        image: flightData.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'
      };

      const updatedFlights = [...flights, newFlight];
      setFlights(updatedFlights);
      localStorage.setItem('ohana_flights', JSON.stringify(updatedFlights));
      
      return { success: true, flight: newFlight };
    } catch (error) {
      console.error('Add flight error:', error);
      return { success: false, error: 'Failed to add flight' };
    }
  };

  const updateFlight = (flightId, updates, userRole) => {
    if (userRole !== 'admin') {
      return { success: false, error: 'Unauthorized: Admin access required' };
    }

    try {
      const updatedFlights = flights.map(flight =>
        flight.id === flightId ? { ...flight, ...updates } : flight
      );
      setFlights(updatedFlights);
      localStorage.setItem('ohana_flights', JSON.stringify(updatedFlights));
      
      return { success: true };
    } catch (error) {
      console.error('Update flight error:', error);
      return { success: false, error: 'Failed to update flight' };
    }
  };

  const deleteFlight = (flightId, userRole) => {
    if (userRole !== 'admin') {
      return { success: false, error: 'Unauthorized: Admin access required' };
    }

    try {
      // Check if there are active bookings for this flight
      const activeBookings = bookings.filter(
        b => b.flightId === flightId && b.status === 'confirmed'
      );
      
      if (activeBookings.length > 0) {
        return { 
          success: false, 
          error: `Cannot delete flight with ${activeBookings.length} active booking(s)` 
        };
      }

      const updatedFlights = flights.filter(flight => flight.id !== flightId);
      setFlights(updatedFlights);
      localStorage.setItem('ohana_flights', JSON.stringify(updatedFlights));
      
      return { success: true };
    } catch (error) {
      console.error('Delete flight error:', error);
      return { success: false, error: 'Failed to delete flight' };
    }
  };

  // Get user-specific bookings (not visible to other users)
  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  // Get all bookings (admin only)
  const getAllBookings = (userRole) => {
    if (userRole !== 'admin') {
      return [];
    }
    return bookings;
  };

  const value = {
    bookings,
    flights,
    loading,
    bookFlight,
    cancelBooking,
    updateBooking,
    addFlight,
    updateFlight,
    deleteFlight,
    getUserBookings,
    getAllBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}