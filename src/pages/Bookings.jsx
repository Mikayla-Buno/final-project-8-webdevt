// src/pages/Bookings.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import BookingCard from '../components/user/BookingCard';

const Bookings = () => {
  const { user } = useAuth();
  const { getUserBookings } = useBooking();
  const [filter, setFilter] = useState('all');

  const userBookings = getUserBookings(user?.id);
  
  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const confirmedBookings = userBookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = userBookings.filter(b => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2 font-elegant">My Bookings</h1>
        <p className="text-gray-600 text-lg mb-8">View and manage your booked flights</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="stat-card bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="stat-number text-4xl font-bold">{userBookings.length}</div>
            <div className="text-blue-100 mt-1">Total Bookings</div>
          </div>

          <div className="stat-card bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="stat-number text-4xl font-bold">{confirmedBookings.length}</div>
            <div className="text-green-100 mt-1">Confirmed</div>
          </div>

          <div className="stat-card bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <div className="stat-number text-4xl font-bold">{cancelledBookings.length}</div>
            <div className="text-red-100 mt-1">Cancelled</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 mb-8">
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setFilter('all')} className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}>
              All ({userBookings.length})
            </button>
            <button onClick={() => setFilter('confirmed')} className={`btn ${filter === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}>
              Confirmed ({confirmedBookings.length})
            </button>
            <button onClick={() => setFilter('cancelled')} className={`btn ${filter === 'cancelled' ? 'btn-primary' : 'btn-secondary'}`}>
              Cancelled ({cancelledBookings.length})
            </button>
          </div>
        </div>

        {/* Booking Cards (GRID instead of vertical list) */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {filter === 'all' ? "No bookings found" : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all'
                ? "You haven't booked any flights yet."
                : `You currently have no ${filter} bookings.`}
            </p>
            <a href="/flights" className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              Book a Flight
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default Bookings;