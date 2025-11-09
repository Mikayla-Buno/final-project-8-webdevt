import React, { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaUser, FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";

const BookingCard = ({ booking, onCancel, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const flight = booking.flight;

  // Status styles with gradients
  const statusStyles = {
    confirmed: { 
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
      color: '#fff',
      shadow: 'rgba(16, 185, 129, 0.3)'
    },
    cancelled: { 
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
      color: '#fff',
      shadow: 'rgba(239, 68, 68, 0.3)'
    },
    pending: { 
      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', 
      color: '#fff',
      shadow: 'rgba(245, 158, 11, 0.3)'
    },
  };

  const currentStatus = statusStyles[booking.status] || statusStyles.pending;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'white',
        border: '1px solid rgba(255,107,53,0.15)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(255,107,53,0.2)' 
          : '0 4px 12px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        maxWidth: '380px',
        width: '100%',
      }}
    >
      {/* Flight Image with Gradient Overlay */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '50%', 
        overflow: 'hidden' 
      }}>
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
            transition: 'transform 0.4s',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        
        {/* Status Badge on Image */}
        <div
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '8px 16px',
            borderRadius: '20px',
            background: currentStatus.background,
            color: currentStatus.color,
            fontWeight: '600',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: `0 4px 12px ${currentStatus.shadow}`,
          }}
        >
          {booking.status}
        </div>

        {/* Airline Name on Image */}
        <div
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '20px',
            color: 'white',
          }}
        >
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>
            {flight.airline}
          </h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>
            Flight {flight.flightNumber}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px' }}>
        {/* Flight Route - Prominent Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(247,147,30,0.08) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(255,107,53,0.1)',
        }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <FaPlaneDeparture color="#FF6B35" size={18} style={{ marginBottom: '6px' }} />
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>
              {flight.origin}
            </p>
          </div>
          
          <div style={{ 
            width: '40px', 
            height: '2px', 
            background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              right: '-4px',
              top: '-3px',
              width: '8px',
              height: '8px',
              background: '#F7931E',
              borderRadius: '50%',
            }} />
          </div>
          
          <div style={{ flex: 1, textAlign: 'center' }}>
            <FaPlaneArrival color="#F7931E" size={18} style={{ marginBottom: '6px' }} />
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>
              {flight.destination}
            </p>
          </div>
        </div>

        {/* Flight Details Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <DetailItem
            icon={<FaCalendarAlt size={14} />}
            label="Date"
            value={new Date(flight.date).toLocaleDateString('en-US', { 
              month: 'short',
              day: 'numeric'
            })}
          />
          <DetailItem
            icon={<FaClock size={14} />}
            label="Depart"
            value={flight.departureTime}
          />
          <DetailItem
            icon={<FaUser size={14} />}
            label="Passengers"
            value={booking.passengers}
          />
          <DetailItem
            icon={<FaTicketAlt size={14} />}
            label="Arrive"
            value={flight.arrivalTime}
          />
        </div>

        {/* Price Display */}
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          borderRadius: '12px',
          marginBottom: '16px',
          textAlign: 'center',
          color: 'white',
        }}>
          <p style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>
            Total Price
          </p>
          <p style={{ fontSize: '28px', fontWeight: '700' }}>
            ${flight.price * booking.passengers}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {booking.status === 'confirmed' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '2px solid #EF4444',
                background: 'white',
                color: '#EF4444',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#EF4444';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#EF4444';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Cancel
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(255,107,53,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,107,53,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.3)';
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div style={{
    padding: '10px',
    background: 'rgba(255,107,53,0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255,107,53,0.1)',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginBottom: '4px',
      color: '#FF6B35',
    }}>
      {icon}
      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '500', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>
      {value}
    </p>
  </div>
);

export default BookingCard;