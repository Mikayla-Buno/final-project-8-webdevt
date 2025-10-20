import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const BookingManagement = () => {
  const { user } = useAuth();
  const { getAllBookings, updateBooking } = useBooking();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Admin sees ALL bookings
  const allBookings = getAllBookings(user?.role);

  const filteredBookings = allBookings.filter(booking => {
    const matchesStatus = filter === 'all' || booking.status === filter;
    const matchesSearch = searchTerm === '' || 
      booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (bookingId, newStatus) => {
    const result = await updateBooking(bookingId, { status: newStatus }, user.id, true);
    if (result.success) {
      window.location.reload();
    } else {
      alert('Failed to update booking: ' + result.error);
    }
  };

  const getStatusClass = (status) => {
    return status === 'confirmed' ? 'booking-confirmed' : 'booking-cancelled';
  };

  const getTotalRevenue = () => {
    return allBookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((total, booking) => total + booking.totalPrice, 0);
  };

  const getFlightStatusClass = (status) => {
    switch (status) {
      case 'On Time': return 'status-on-time';
      case 'Delayed': return 'status-delayed';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-on-time';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Booking Management</h1>
          <p className="text-gray-600 mt-1">View and manage all customer bookings</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">₱{getTotalRevenue().toLocaleString()}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="stat-number">{allBookings.length}</div>
          <div className="stat-label text-blue-100">Total Bookings</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="stat-number">
            {allBookings.filter(b => b.status === 'confirmed').length}
          </div>
          <div className="stat-label text-green-100">Confirmed</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="stat-number">
            {allBookings.filter(b => b.status === 'cancelled').length}
          </div>
          <div className="stat-label text-red-100">Cancelled</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="stat-number">
            {allBookings.reduce((total, booking) => total + booking.passengers, 0)}
          </div>
          <div className="stat-label text-purple-100">Total Passengers</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All ({allBookings.length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`btn ${filter === 'confirmed' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Confirmed ({allBookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`btn ${filter === 'cancelled' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Cancelled ({allBookings.filter(b => b.status === 'cancelled').length})
            </button>
          </div>
          <div className="flex-1 md:max-w-md md:ml-4">
            <input
              type="text"
              placeholder="Search by booking ref or flight number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input w-full"
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Booking Ref</th>
                <th className="table-header">Flight</th>
                <th className="table-header">Passengers</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Booking Date</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="table-row hover:bg-gray-50">
                    <td className="table-cell">
                      <p className="font-mono font-semibold text-blue-600">{booking.bookingReference}</p>
                      <p className="text-xs text-gray-500">User ID: {booking.userId}</p>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        {booking.flight.image && (
                          <img
                            src={booking.flight.image}
                            alt="Flight"
                            className="w-16 h-12 object-cover rounded"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                            }}
                          />
                        )}
                        <div>
                          <p className="font-semibold">{booking.flight.flightNumber}</p>
                          <p className="text-sm text-gray-500">
                            {booking.flight.origin} → {booking.flight.destination}
                          </p>
                          <span className={`text-xs ${getFlightStatusClass(booking.flight.status)}`}>
                            {booking.flight.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <p className="font-semibold">{booking.passengers} passenger(s)</p>
                      {booking.passengerDetails && booking.passengerDetails.length > 0 && (
                        <p className="text-sm text-gray-500">
                          {booking.passengerDetails[0].name}
                          {booking.passengers > 1 && ` +${booking.passengers - 1} more`}
                        </p>
                      )}
                    </td>
                    <td className="table-cell">
                      <p className="font-bold text-green-600">₱{booking.totalPrice.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">₱{booking.flight.price} × {booking.passengers}</p>
                    </td>
                    <td className="table-cell">
                      <p className="text-sm">{booking.bookingDate}</p>
                      <p className="text-xs text-gray-500">
                        Flight: {booking.flight.date}
                      </p>
                    </td>
                    <td className="table-cell">
                      <span className={getStatusClass(booking.status)}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex space-x-2">
                        {booking.status === 'confirmed' ? (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            className="btn btn-danger text-sm py-1 px-3"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            className="btn btn-success text-sm py-1 px-3"
                          >
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No bookings found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {filteredBookings.length} of {allBookings.length} total bookings
        </div>
      )}
    </div>
  );
};

export default BookingManagement;