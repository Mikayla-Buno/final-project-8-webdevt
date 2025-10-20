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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-elegant">My Bookings</h1>
          <p className="text-gray-600 text-lg font-base">Manage your flight reservations and view booking history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="stat-number">{userBookings.length}</div>
            <div className="stat-label text-blue-100">Total Bookings</div>
          </div>
          <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="stat-number">{confirmedBookings.length}</div>
            <div className="stat-label text-green-100">Confirmed</div>
          </div>
          <div className="stat-card bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="stat-number">{cancelledBookings.length}</div>
            <div className="stat-label text-red-100">Cancelled</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="card p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Bookings ({userBookings.length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`btn ${filter === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Confirmed ({confirmedBookings.length})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`btn ${filter === 'cancelled' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Cancelled ({cancelledBookings.length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <div className="card p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-elegant">
                {filter === 'all' ? 'No bookings found' : `No ${filter} bookings`}
              </h3>
              <p className="text-gray-600 mb-6 font-base">
                {filter === 'all'
                  ? "You haven't made any bookings yet. Start your journey by booking a flight!"
                  : `You don't have any ${filter} bookings at the moment.`
                }
              </p>
              {filter === 'all' && (
                <a
                  href="/flights"
                  className="elegant-button px-8 py-3 inline-block"
                >
                  Book Your First Flight
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;