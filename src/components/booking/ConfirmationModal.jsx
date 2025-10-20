import React from 'react';

const ConfirmationModal = ({ booking, onClose, onPrint }) => {
  if (!booking) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-2xl">
        <div className="modal-header">
          <h3 className="text-2xl font-bold font-elegant" style={{ color: 'var(--blue-munsell)' }}>
            Booking Confirmed! ✓
          </h3>
        </div>
       
        <div className="modal-body">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">✈️</div>
            <p className="text-lg font-base" style={{ color: 'var(--charcoal)' }}>
              Your flight has been successfully booked
            </p>
          </div>

          <div className="p-6 rounded-lg mb-4" style={{ 
            background: 'linear-gradient(135deg, rgba(169, 214, 229, 0.2), rgba(232, 196, 196, 0.2))',
            border: '2px solid var(--powder-blue)'
          }}>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold font-elegant mb-1" style={{ 
                background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--satin-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {booking.bookingReference}
              </p>
              <p className="font-base" style={{ color: 'var(--charcoal)', opacity: 0.7 }}>
                Booking Reference
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="font-base">
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--charcoal)' }}>Flight:</strong> {booking.flight.flightNumber}
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--charcoal)' }}>Route:</strong> {booking.flight.origin} → {booking.flight.destination}
                </p>
                <p>
                  <strong style={{ color: 'var(--charcoal)' }}>Date:</strong> {booking.flight.date}
                </p>
              </div>
              <div className="font-base">
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--charcoal)' }}>Passengers:</strong> {booking.passengers}
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--charcoal)' }}>Total Paid:</strong> ₱{booking.totalPrice.toLocaleString()}
                </p>
                <p>
                  <strong style={{ color: 'var(--charcoal)' }}>Status:</strong> 
                  <span className="booking-confirmed ml-2">Confirmed</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-4 mb-4" style={{ 
            background: 'rgba(205, 165, 91, 0.1)',
            border: '2px solid var(--satin-gold)'
          }}>
            <h4 className="font-semibold mb-2 font-base" style={{ color: 'var(--gold-dark)' }}>
              ⚠️ Important Information
            </h4>
            <ul className="text-sm font-base" style={{ color: 'var(--charcoal)', opacity: 0.8 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                • Please arrive at the airport at least 2 hours before departure
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                • Bring a valid government-issued ID for all passengers
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                • Check-in online 24 hours before your flight
              </li>
              <li>
                • Keep this booking reference for your records
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={onPrint}
            className="btn btn-primary"
          >
            Print Ticket
          </button>
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;