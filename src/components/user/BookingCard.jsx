import React, { useState } from 'react';

// Mock data for demonstration
const mockBookings = [
  {
    id: 1,
    status: 'confirmed',
    passengers: 2,
    userId: 1,
    flightId: 1,
    flight: {
      airline: 'Ohana Airlines',
      flightNumber: 'OH123',
      origin: 'MNL',
      destination: 'CEB',
      date: '2025-11-15',
      departureTime: '08:00',
      arrivalTime: '09:30',
      price: 150,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'
    }
  },
  {
    id: 2,
    status: 'confirmed',
    passengers: 1,
    userId: 1,
    flightId: 2,
    flight: {
      airline: 'Ohana Airlines',
      flightNumber: 'OH456',
      origin: 'CEB',
      destination: 'DVO',
      date: '2025-11-20',
      departureTime: '14:00',
      arrivalTime: '15:15',
      price: 120,
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80'
    }
  },
  {
    id: 3,
    status: 'cancelled',
    passengers: 3,
    userId: 1,
    flightId: 3,
    flight: {
      airline: 'Ohana Airlines',
      flightNumber: 'OH789',
      origin: 'MNL',
      destination: 'BCD',
      date: '2025-11-25',
      departureTime: '10:00',
      arrivalTime: '11:00',
      price: 100,
      image: 'https://images.unsplash.com/photo-1583513702439-2e611c58e93d?w=800&q=80'
    }
  }
];

const Bookings = () => {
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const userBookings = mockBookings;

  const filteredBookings = userBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const confirmedBookings = userBookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = userBookings.filter(b => b.status === 'cancelled');

  const handleCancel = (bookingId) => {
    alert('Booking cancelled!');
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '48px 16px',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F0 25%, #FFE8DC 50%, #FFF5F0 75%, #FFFFFF 100%)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center', animation: 'fadeSlideDown 0.6s ease-out' }}>
          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 'bold',
              marginBottom: '12px',
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            My Bookings
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7280', fontWeight: '500' }}>
            View and manage your booked flights
          </p>
        </div>

        {/* Stats Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            animation: 'fadeSlideUp 0.7s ease-out'
          }}
        >
          <StatsCard number={userBookings.length} label="Total Bookings" delay="0s" />
          <StatsCard number={confirmedBookings.length} label="Confirmed" delay="0.1s" />
          <StatsCard number={cancelledBookings.length} label="Cancelled" delay="0.2s" />
        </div>

        {/* Filter Section */}
        <div style={{ marginBottom: '40px', animation: 'fadeSlideUp 0.8s ease-out' }}>
          <div style={{
            borderRadius: '16px',
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 107, 53, 0.15)',
            boxShadow: '0 8px 32px rgba(255, 107, 53, 0.08)',
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

        {/* Booking Cards Grid - FIXED */}
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
      shadow: 'rgba(16, 185, 129, 0.3)'
    },
    cancelled: { 
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
      color: '#fff',
      shadow: 'rgba(239, 68, 68, 0.3)'
    },
  };

  const currentStatus = statusStyles[booking.status] || statusStyles.confirmed;

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
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px 0' }}>
            {flight.airline}
          </h2>
          <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>
            Flight {flight.flightNumber}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px' }}>
        {/* Flight Route */}
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
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>✈️</div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', margin: 0 }}>
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
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', margin: 0 }}>
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
                border: '2px solid #EF4444',
                background: 'white',
                color: '#EF4444',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s',
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
    background: 'rgba(255,107,53,0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255,107,53,0.1)',
  }}>
    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '500', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
      {label}
    </span>
    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', margin: 0 }}>
      {value}
    </p>
  </div>
);

const StatsCard = ({ number, label, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
        border: '1px solid rgba(255, 107, 53, 0.15)',
        boxShadow: isHovered ? '0 20px 40px rgba(255, 107, 53, 0.15)' : '0 8px 24px rgba(255, 107, 53, 0.08)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeSlideUp 0.7s ease-out ${delay}`,
      }}
    >
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '12px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {number}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#6B7280' }}>
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
        background: active ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' : isHovered ? 'rgba(255,107,53,0.08)' : 'white',
        color: active ? 'white' : '#FF6B35',
        border: `2px solid ${active ? 'transparent' : 'rgba(255,107,53,0.2)'}`,
        boxShadow: active ? '0 8px 20px rgba(255,107,53,0.3)' : isHovered ? '0 4px 15px rgba(255,107,53,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
        transform: isHovered || active ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      <span>{label}</span>
      <span style={{
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        background: active ? 'rgba(255,255,255,0.25)' : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
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
      background: 'white',
      border: '2px dashed rgba(255,107,53,0.2)',
      animation: 'fadeSlideUp 0.6s ease-out',
    }}>
      <div style={{
        width: '120px',
        height: '120px',
        margin: '0 auto 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
        border: '3px solid rgba(255,107,53,0.15)',
        fontSize: '48px',
      }}>
        ✈️
      </div>
      
      <h3 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '12px',
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {filter === 'all' ? "No bookings found" : `No ${filter} bookings`}
      </h3>
      <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
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
          boxShadow: isHovered ? '0 12px 30px rgba(255,107,53,0.4)' : '0 6px 20px rgba(255,107,53,0.3)',
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