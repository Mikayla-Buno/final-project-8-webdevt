import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const BookingCard = ({ booking }) => {
  const { user } = useAuth();
  const { cancelBooking } = useBooking();

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      const result = await cancelBooking(booking.id, user.id);
      if (result.success) {
        alert('Booking cancelled successfully');
        window.location.reload();
      } else {
        alert('Failed to cancel booking: ' + result.error);
      }
    }
  };

  const getStatusClass = (status) => {
    return status === 'confirmed' ? 'booking-confirmed' : 'booking-cancelled';
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
    <div className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="md:flex">
        {/* Flight Image */}
        {booking.flight.image && (
          <div className="md:w-1/3 h-48 md:h-auto">
            <img
              src={booking.flight.image}
              alt={`${booking.flight.origin} to ${booking.flight.destination}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
              }}
            />
          </div>
        )}

        {/* Booking Details */}
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 font-elegant">
                {booking.flight.flightNumber}
              </h3>
              <p className="text-sm text-gray-600 font-base">
                Booking Reference: <span className="font-mono font-semibold text-blue-600">{booking.bookingReference}</span>
              </p>
              <p className="text-sm text-gray-500 font-base">Booked on {booking.bookingDate}</p>
            </div>
            <div className="text-right">
              <span className={getStatusClass(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <p className="text-2xl font-bold text-blue-600 mt-2 font-elegant">₱{booking.totalPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500 font-base">{booking.passengers} passenger(s)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
            {/* Flight Details */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center font-base">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Flight Details
              </h4>
              <div className="space-y-1 text-sm">
                <p className="font-base"><span className="text-gray-600">Route:</span> <span className="font-medium">{booking.flight.origin} → {booking.flight.destination}</span></p>
                <p className="font-base"><span className="text-gray-600">Date:</span> <span className="font-medium">{booking.flight.date}</span></p>
                <p className="font-base"><span className="text-gray-600">Time:</span> <span className="font-medium">{booking.flight.departureTime} - {booking.flight.arrivalTime}</span></p>
                <p className="font-base"><span className="text-gray-600">Duration:</span> <span className="font-medium">{booking.flight.duration}</span></p>
                <p className="font-base"><span className="text-gray-600">Aircraft:</span> <span className="font-medium">{booking.flight.aircraft}</span></p>
                <p className="font-base">
                  <span className="text-gray-600">Status:</span> 
                  <span className={`ml-2 ${getFlightStatusClass(booking.flight.status)}`}>
                    {booking.flight.status}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Passenger Details */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center font-base">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Passenger Details
              </h4>
              <div className="space-y-1">
                <p className="text-sm font-base"><span className="text-gray-600">Total Passengers:</span> <span className="font-medium">{booking.passengers}</span></p>
                {booking.passengerDetails && booking.passengerDetails.map((passenger, index) => (
                  <div key={index} className="text-sm bg-blue-50 p-2 rounded border border-blue-100">
                    <p className="font-medium font-base">{passenger.name}</p>
                    <p className="text-gray-600 text-xs font-base">Age: {passenger.age}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Information */}
          {booking.status === 'confirmed' && (
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-800 font-base">
                <strong>Important:</strong> Please arrive at the airport at least 2 hours before departure. Bring a valid ID for all passengers.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {booking.status === 'confirmed' && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="btn btn-primary flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Ticket
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-danger flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Booking
              </button>
            </div>
          )}

          {booking.status === 'cancelled' && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-800 font-base">
                <strong>Cancelled:</strong> This booking has been cancelled. Please contact customer service for refund information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;