import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useToast } from '../contexts/ToastContext';
import BookingDetailsModal from '../components/user/BookingDetailsModal';

const Bookings = () => {
  const { user } = useAuth();
  const { getUserBookings, cancelBooking } = useBooking();
  const { success, error } = useToast();
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Get actual user bookings from context
  const userBookings = getUserBookings(user?.id);

  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const confirmedBookings = userBookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = userBookings.filter(b => b.status === 'cancelled');

  const handleCancel = (bookingId) => {
    const result = cancelBooking(bookingId, user.id);
    if (result.success) {
      success('Booking cancelled successfully!');
    } else {
      error(result.error || 'Failed to cancel booking');
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="min-h-screen py-10 px-4"
        style={{
          backgroundImage: `url('images/home.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center', animation: 'fadeSlideDown 0.6s ease-out' }}>
          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#ffffff',
              textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            My Bookings
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#ffffff', 
            fontWeight: '500',
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.2)',
          }}>
            View and manage your booked flights
          </p>
        </div>

        {/* Stats Cards - TRUE Glass Design */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            animation: 'fadeSlideUp 0.7s ease-out'
          }}
        >
          <StatsCard 
            number={userBookings.length} 
            label="Total Bookings" 
            delay="0s"
            gradient="linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
          />
          <StatsCard 
            number={confirmedBookings.length} 
            label="Confirmed" 
            delay="0.1s"
            gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
          />
          <StatsCard 
            number={cancelledBookings.length} 
            label="Cancelled" 
            delay="0.2s"
            gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
          />
        </div>

        {/* Filter Section - TRUE Glass Design */}
        <div style={{ marginBottom: '40px', animation: 'fadeSlideUp 0.8s ease-out' }}>
          <div style={{
            borderRadius: '20px',
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <FilterButton
                active={filter === 'all'}
                onClick={() => setFilter('all')}
                label="All"
                count={userBookings.length}
              />
              <FilterButton
                active={filter === 'confirmed'}
                onClick={() => setFilter('confirmed')}
                label="Confirmed"
                count={confirmedBookings.length}
              />
              <FilterButton
                active={filter === 'cancelled'}
                onClick={() => setFilter('cancelled')}
                label="Cancelled"
                count={cancelledBookings.length}
              />
            </div>
          </div>
        </div>

        {/* Booking Cards Grid */}
        {filteredBookings.length > 0 ? (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px',
              animation: 'fadeSlideUp 0.9s ease-out',
              justifyItems: 'center',
            }}
          >
            {filteredBookings.map((booking, index) => (
              <div
                key={booking.id}
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${index * 0.08}s backwards`,
                  width: '100%',
                  maxWidth: '380px',
                }}
              >
                <BookingCard
                  booking={booking}
                  onCancel={() => handleCancel(booking.id)}
                  onViewDetails={() => handleViewDetails(booking)}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}

      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const BookingCard = ({ booking, onCancel, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const flight = booking.flight;

  const statusStyles = {
    confirmed: { 
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
      color: '#fff',
      shadow: 'rgba(16, 185, 129, 0.4)'
    },
    cancelled: { 
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
      color: '#fff',
      shadow: 'rgba(239, 68, 68, 0.4)'
    },
  };

  const currentStatus = statusStyles[booking.status] || statusStyles.confirmed;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.2)' 
          : '0 8px 24px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        width: '100%',
      }}
    >
      {/* Flight Image */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '85%', 
        overflow: 'hidden',
      }}>
        <img
          src={flight.image}
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
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
        }} />
        
        {/* Status Badge */}
        <div style={{
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
        }}>
          {booking.status}
        </div>

        {/* Airline Name */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '20px',
          color: 'white',
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px 0', textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
            {flight.airline}
          </h2>
          <p style={{ fontSize: '13px', opacity: 0.9, margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)' }}>
            Flight {flight.flightNumber}
          </p>
        </div>
      </div>

      {/* Card Content - Glass Effect */}
      <div style={{ 
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        {/* Flight Route */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
        }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>✈️</div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
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
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>🛬</div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
              {flight.destination}
            </p>
          </div>
        </div>

        {/* Flight Details */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <DetailItem label="Date" value={new Date(flight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
          <DetailItem label="Depart" value={flight.departureTime} />
          <DetailItem label="Passengers" value={booking.passengers} />
          <DetailItem label="Arrive" value={flight.arrivalTime} />
        </div>

        {/* Price */}
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          borderRadius: '12px',
          marginBottom: '16px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
        }}>
          <p style={{ fontSize: '12px', opacity: 0.9, margin: '0 0 4px 0' }}>
            Total Price
          </p>
          <p style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>
            ${flight.price * booking.passengers}
          </p>
        </div>

        {/* Buttons */}
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
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 15px rgba(239, 68, 68, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
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
              boxShadow: '0 4px 12px rgba(255,107,53,0.4)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255,107,53,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(255,107,53,0.4)';
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div style={{
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.25)',
  }}>
    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500', textTransform: 'uppercase', display: 'block', marginBottom: '4px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
      {label}
    </span>
    <p style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
      {value}
    </p>
  </div>
);

const StatsCard = ({ number, label, delay, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '20px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeSlideUp 0.7s ease-out ${delay}`,
      }}
    >
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '12px',
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {number}
      </div>
      <div style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#ffffff',
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
      }}>
        {label}
      </div>
    </div>
  );
};

const FilterButton = ({ active, onClick, label, count }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '16px',
        transition: 'all 0.3s',
        background: active 
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' 
          : isHovered 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        border: `2px solid ${active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'}`,
        boxShadow: active 
          ? '0 8px 20px rgba(255,107,53,0.4)' 
          : isHovered 
            ? '0 4px 15px rgba(0, 0, 0, 0.1)' 
            : 'none',
        transform: isHovered || active ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      }}
    >
      <span>{label}</span>
      <span style={{
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        background: active ? 'rgba(255,255,255,0.25)' : 'rgba(255, 255, 255, 0.2)',
        color: 'white',
      }}>
        {count}
      </span>
    </button>
  );
};

const EmptyState = ({ filter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 24px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '2px dashed rgba(255, 255, 255, 0.3)',
      animation: 'fadeSlideUp 0.6s ease-out',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        width: '120px',
        height: '120px',
        margin: '0 auto 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        fontSize: '48px',
      }}>
        ✈️
      </div>
      
      <h3 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#ffffff',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      }}>
        {filter === 'all' ? "No bookings found" : `No ${filter} bookings`}
      </h3>
      <p style={{ 
        color: '#ffffff', 
        fontSize: '16px', 
        marginBottom: '32px', 
        maxWidth: '400px', 
        margin: '0 auto 32px',
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
      }}>
        {filter === 'all'
          ? "Ready to explore the world? Book your first flight and start your adventure!"
          : `You currently have no ${filter} bookings.`}
      </p>
      
      <a
        href="/flights"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 32px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '16px',
          color: 'white',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          boxShadow: isHovered ? '0 12px 30px rgba(255,107,53,0.5)' : '0 6px 20px rgba(255,107,53,0.4)',
          transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'all 0.3s',
        }}
      >
        <span>Book Your First Flight</span>
        <span>→</span>
      </a>
    </div>
  );
};

export default Bookings;