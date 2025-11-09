import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";

const BookingCard = ({ booking, onCancel, onViewDetails }) => {
  const flight = booking.flight;

  // Status styles
  const statusStyles = {
    confirmed: { background: 'rgba(34,197,94,0.15)', color: '#22C55E' },
    cancelled: { background: 'rgba(239,68,68,0.15)', color: '#EF4444' },
    pending: { background: 'rgba(234,179,8,0.15)', color: '#EAB308' },
  };

  return (
    <div
      style={{
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        marginBottom: '2rem'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
      }}
    >
      {/* Flight Image */}
      <div style={{ width: '100%', height: '160px', overflow: 'hidden' }}>
        <img
          src={flight.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'}
          alt={flight.airline}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>{flight.airline}</h2>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Flight #{flight.flightNumber}</p>
          </div>
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '0.75rem',
              ...statusStyles[booking.status] || statusStyles.pending
            }}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Flight Details */}
        <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlaneDeparture color="#3B82F6" /> <strong>From:</strong> {flight.origin}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlaneArrival color="#EF4444" /> <strong>To:</strong> {flight.destination}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCalendarAlt color="#6B7280" /> <strong>Date:</strong> {new Date(flight.date).toLocaleDateString()}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaClock color="#6B7280" /> <strong>Time:</strong> {flight.departureTime} → {flight.arrivalTime}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaUser color="#6B7280" /> <strong>Passengers:</strong> {booking.passengers}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          {booking.status === 'confirmed' && (
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #EF4444',
                background: 'transparent',
                color: '#EF4444',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Cancel
            </button>
          )}
          <button
            onClick={onViewDetails}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '0.75rem',
              border: '1px solid #3B82F6',
              background: 'transparent',
              color: '#3B82F6',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
