import React from 'react';
import { 
  FaTimes, 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaTicketAlt,
  FaBarcode
} from 'react-icons/fa';

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const flight = booking.flight;

  const statusStyles = {
    confirmed: { 
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
      color: '#fff',
      text: 'Confirmed'
    },
    cancelled: { 
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
      color: '#fff',
      text: 'Cancelled'
    },
    pending: { 
      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', 
      color: '#fff',
      text: 'Pending'
    },
  };

  const currentStatus = statusStyles[booking.status] || statusStyles.pending;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          width: '90%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'slideUp 0.4s ease',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}
        >
          {/* Header with Image */}
          <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
            <img
              src={flight.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'}
              alt={flight.airline}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                e.currentTarget.style.background = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
              }}
            >
              <FaTimes size={18} color="#334155" />
            </button>

            {/* Header Content */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '30px',
              right: '30px',
              color: 'white',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                    {flight.airline}
                  </h2>
                  <p style={{ fontSize: '16px', opacity: 0.9 }}>
                    Flight {flight.flightNumber}
                  </p>
                </div>
                <div
                  style={{
                    padding: '10px 20px',
                    borderRadius: '12px',
                    background: currentStatus.background,
                    color: currentStatus.color,
                    fontWeight: '600',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {currentStatus.text}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '30px' }}>
            {/* Booking Reference */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
                border: '2px dashed rgba(255,107,53,0.3)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <FaBarcode size={24} />
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>
                  Booking Reference
                </p>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#FF6B35', letterSpacing: '1px' }}>
                  {booking.bookingReference}
                </p>
              </div>
            </div>

            {/* Flight Route */}
            <div style={{ marginBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '25px',
                  background: 'linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(247,147,30,0.05) 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,107,53,0.1)',
                }}
              >
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <FaPlaneDeparture size={28} color="#FF6B35" style={{ marginBottom: '12px' }} />
                  <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '6px', fontWeight: '500' }}>
                    FROM
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
                    {flight.origin}
                  </p>
                </div>

                <div style={{ 
                  width: '80px', 
                  height: '2px', 
                  background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)',
                  position: 'relative',
                }}>
                  <div
                    style={{
                      position: 'absolute',
                      right: '-5px',
                      top: '-4px',
                      width: '10px',
                      height: '10px',
                      background: '#F7931E',
                      borderRadius: '50%',
                    }}
                  />
                </div>

                <div style={{ flex: 1, textAlign: 'center' }}>
                  <FaPlaneArrival size={28} color="#F7931E" style={{ marginBottom: '12px' }} />
                  <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '6px', fontWeight: '500' }}>
                    TO
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
                    {flight.destination}
                  </p>
                </div>
              </div>
            </div>

            {/* Flight Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '30px',
            }}>
              <DetailCard
                icon={<FaCalendarAlt size={20} />}
                label="Departure Date"
                value={new Date(flight.date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
              <DetailCard
                icon={<FaClock size={20} />}
                label="Departure Time"
                value={flight.departureTime}
              />
              <DetailCard
                icon={<FaClock size={20} />}
                label="Arrival Time"
                value={flight.arrivalTime}
              />
              <DetailCard
                icon={<FaUser size={20} />}
                label="Passengers"
                value={`${booking.passengers} ${booking.passengers === 1 ? 'Person' : 'People'}`}
              />
              <DetailCard
                icon={<FaTicketAlt size={20} />}
                label="Class"
                value={booking.class || 'Economy'}
              />
              <DetailCard
                icon={<FaCalendarAlt size={20} />}
                label="Booking Date"
                value={new Date(booking.bookingDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
            </div>

            {/* Price Summary */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                borderRadius: '16px',
                padding: '25px',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>
                    Total Amount
                  </p>
                  <p style={{ fontSize: '36px', fontWeight: '700' }}>
                    ${flight.price * booking.passengers}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '4px' }}>
                    Price per passenger
                  </p>
                  <p style={{ fontSize: '20px', fontWeight: '600' }}>
                    ${flight.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
};

const DetailCard = ({ icon, label, value }) => (
  <div
    style={{
      background: 'white',
      border: '1px solid rgba(255,107,53,0.15)',
      borderRadius: '12px',
      padding: '18px',
      transition: 'all 0.3s',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(255,107,53,0.4)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,107,53,0.15)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <div style={{ 
      color: '#FF6B35', 
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      {icon}
      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
    <p style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B' }}>
      {value}
    </p>
  </div>
);

export default BookingDetailsModal;