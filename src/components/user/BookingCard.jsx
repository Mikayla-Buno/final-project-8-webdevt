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
        borderRadius: '.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        marginBottom: '1.5rem',
        maxWidth: '320px',
        width: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
      }}
    >
      {/* Flight Image with fixed aspect ratio */}
      <div style={{ width: '100%', paddingTop: '45%', position: 'relative', overflow: 'hidden' }}>
        <img
          src={flight.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'}
          alt={flight.airline}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Card Content */}
      <div style={{ padding: '1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#1F2937' }}>{flight.airline}</h2>
            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Flight #{flight.flightNumber}</p>
          </div>
          <span
            style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '0.7rem',
              ...statusStyles[booking.status] || statusStyles.pending
            }}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Flight Details */}
        <div style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.5 }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaPlaneDeparture color="#3B82F6" /> <strong>From:</strong> {flight.origin}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaPlaneArrival color="#EF4444" /> <strong>To:</strong> {flight.destination}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaCalendarAlt color="#6B7280" /> <strong>Date:</strong> {new Date(flight.date).toLocaleDateString()}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaClock color="#6B7280" /> <strong>Time:</strong> {flight.departureTime} → {flight.arrivalTime}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FaUser color="#6B7280" /> <strong>Passengers:</strong> {booking.passengers}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          {booking.status === 'confirmed' && (
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #EF4444',
                background: 'transparent',
                color: '#EF4444',
                fontWeight: 600,
                fontSize: '0.75rem',
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
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #3B82F6',
              background: 'transparent',
              color: '#3B82F6',
              fontWeight: 600,
              fontSize: '0.75rem',
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
