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

  const getTotalRevenue = () => {
    return allBookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((total, booking) => total + booking.totalPrice, 0);
  };

  const getFlightStatusClass = (status) => {
    switch (status) {
      case 'On Time': return '#10B981';
      case 'Delayed': return '#F59E0B';
      case 'Cancelled': return '#EF4444';
      default: return '#10B981';
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 16px',
        backgroundImage: `url('/images/home.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: '-34px',
        paddingTop: '48px',
        paddingBottom: '48px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Banner - TRUE Glass Design */}
        <div
          style={{
            borderRadius: '24px',
            padding: '48px 32px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: '40px',
            animation: 'fadeSlideDown 0.6s ease-out',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#ffffff',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span>📋</span>
                Booking Management
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  fontWeight: '500',
                  textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                View and manage all customer bookings
              </p>
            </div>
            <div
              style={{
                textAlign: 'right',
                padding: '24px 32px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '8px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                Total Revenue
              </p>
              <p
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                }}
              >
                ₱{getTotalRevenue().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <StatCard
            value={allBookings.length}
            label="Total Bookings"
            icon="📦"
            delay="0s"
            gradient="linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
          />
          <StatCard
            value={allBookings.filter(b => b.status === 'confirmed').length}
            label="Confirmed"
            icon="✅"
            delay="0.1s"
            gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
          />
          <StatCard
            value={allBookings.filter(b => b.status === 'cancelled').length}
            label="Cancelled"
            icon="❌"
            delay="0.2s"
            gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
          />
          <StatCard
            value={allBookings.reduce((total, booking) => total + booking.passengers, 0)}
            label="Total Passengers"
            icon="👥"
            delay="0.3s"
            gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
          />
        </div>

        {/* Filters and Search */}
        <div
          style={{
            borderRadius: '24px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px',
            animation: 'fadeSlideUp 0.7s ease-out',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <FilterButton
                active={filter === 'all'}
                onClick={() => setFilter('all')}
                label={`All (${allBookings.length})`}
              />
              <FilterButton
                active={filter === 'confirmed'}
                onClick={() => setFilter('confirmed')}
                label={`Confirmed (${allBookings.filter(b => b.status === 'confirmed').length})`}
              />
              <FilterButton
                active={filter === 'cancelled'}
                onClick={() => setFilter('cancelled')}
                label={`Cancelled (${allBookings.filter(b => b.status === 'cancelled').length})`}
              />
            </div>
            <input
              type="text"
              placeholder="🔍 Search by booking ref or flight number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontSize: '16px',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Bookings Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            animation: 'fadeSlideUp 0.8s ease-out',
          }}
        >
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                index={index}
                handleStatusChange={handleStatusChange}
                getFlightStatusClass={getFlightStatusClass}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {filteredBookings.length > 0 && (
          <div
            style={{
              marginTop: '32px',
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            Showing {filteredBookings.length} of {allBookings.length} total bookings
          </div>
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

        input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ value, label, icon, delay, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '20px',
        padding: '32px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0, 0, 0, 0.15)'
          : '0 8px 24px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeSlideUp 0.7s ease-out ${delay}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '48px',
          opacity: 0.2,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '12px',
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#ffffff',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const FilterButton = ({ active, onClick, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '12px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: active
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
          : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: active
          ? '0 4px 12px rgba(255, 107, 53, 0.3)'
          : isHovered
          ? '0 4px 12px rgba(0, 0, 0, 0.15)'
          : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      }}
    >
      {label}
    </button>
  );
};

const BookingCard = ({ booking, index, handleStatusChange, getFlightStatusClass }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '20px',
        padding: '32px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: isHovered
          ? '0 12px 32px rgba(0, 0, 0, 0.15)'
          : '0 8px 24px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeSlideUp 0.5s ease-out ${index * 0.05}s backwards`,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        {/* Booking Reference */}
        <div>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            Booking Reference
          </p>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: '4px',
            }}
          >
            {booking.bookingReference}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            User ID: {booking.userId}
          </p>
        </div>

        {/* Flight Details */}
        <div>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            Flight Details
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            {booking.flight.image && (
              <img
                src={booking.flight.image}
                alt="Flight"
                style={{
                  width: '60px',
                  height: '45px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                }}
              />
            )}
            <div>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
                {booking.flight.flightNumber}
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                {booking.flight.origin} → {booking.flight.destination}
              </p>
            </div>
          </div>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              background: `${getFlightStatusClass(booking.flight.status)}33`,
              color: getFlightStatusClass(booking.flight.status),
              border: `1px solid ${getFlightStatusClass(booking.flight.status)}66`,
            }}
          >
            {booking.flight.status}
          </span>
        </div>

        {/* Passengers */}
        <div>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            Passengers
          </p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', marginBottom: '4px' }}>
            {booking.passengers} passenger(s)
          </p>
          {booking.passengerDetails && booking.passengerDetails.length > 0 && (
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
              {booking.passengerDetails[0].name}
              {booking.passengers > 1 && ` +${booking.passengers - 1} more`}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            Total Amount
          </p>
          <p
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ffffff',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              marginBottom: '4px',
            }}
          >
            ₱{booking.totalPrice.toLocaleString()}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            ₱{booking.flight.price.toLocaleString()} × {booking.passengers}
          </p>
        </div>

        {/* Dates */}
        <div>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '8px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            Dates
          </p>
          <p style={{ fontSize: '14px', color: '#ffffff', textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)', marginBottom: '4px' }}>
            📅 Booked: {booking.bookingDate}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
            ✈️ Flight: {booking.flight.date}
          </p>
        </div>

        {/* Status & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background:
                booking.status === 'confirmed'
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              color: 'white',
              boxShadow:
                booking.status === 'confirmed'
                  ? '0 4px 12px rgba(16, 185, 129, 0.4)'
                  : '0 4px 12px rgba(239, 68, 68, 0.4)',
            }}
          >
            {booking.status}
          </div>
          <ActionButton
            onClick={() =>
              handleStatusChange(
                booking.id,
                booking.status === 'confirmed' ? 'cancelled' : 'confirmed'
              )
            }
            isCancel={booking.status === 'confirmed'}
          />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ onClick, isCancel }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '10px 20px',
        borderRadius: '12px',
        border: 'none',
        background: isCancel
          ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
          : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        color: 'white',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: isHovered
          ? isCancel
            ? '0 8px 20px rgba(239, 68, 68, 0.5)'
            : '0 8px 20px rgba(16, 185, 129, 0.5)'
          : isCancel
          ? '0 4px 12px rgba(239, 68, 68, 0.3)'
          : '0 4px 12px rgba(16, 185, 129, 0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {isCancel ? '❌ Cancel Booking' : '✅ Restore Booking'}
    </button>
  );
};

const EmptyState = () => {
  return (
    <div
      style={{
        borderRadius: '24px',
        padding: '64px 32px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '2px dashed rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '80px', marginBottom: '24px', opacity: 0.7 }}>📋</div>
      <p
        style={{
          fontSize: '18px',
          color: '#ffffff',
          fontWeight: '500',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        No bookings found matching your criteria
      </p>
    </div>
  );
};

export default BookingManagement;