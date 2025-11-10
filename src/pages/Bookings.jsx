import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { useToast } from '../contexts/ToastContext';
import BookingCard from '../components/user/BookingCard';
import BookingDetailsModal from '../components/user/BookingDetailsModal';

const Bookings = () => {
  const { user } = useAuth();
  const { getUserBookings, cancelBooking } = useBooking();
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

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
      toast.success('Booking cancelled successfully!');
    } else {
      toast.error(result.error || 'Failed to cancel booking');
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FFF8F3 0%, #FFE8DC 50%, #FFF8F3 100%)',
      }}
    >
      <div className="max-w-[1600px] mx-auto">

        {/* Glassy Header Container */}
        <div 
          className="rounded-3xl p-8 mb-8"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 32px rgba(255, 107, 53, 0.1)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              My Bookings
            </h1>
            <p className="text-gray-600">Manage your flight reservations</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard number={userBookings.length} label="Total" />
            <StatCard number={confirmedBookings.length} label="Confirmed" />
            <StatCard number={cancelledBookings.length} label="Cancelled" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <FilterChip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              label="All Bookings "
              count={userBookings.length}
            />
            <FilterChip
              active={filter === 'confirmed'}
              onClick={() => setFilter('confirmed')}
              label="Confirmed "
              count={confirmedBookings.length}
            />
            <FilterChip
              active={filter === 'cancelled'}
              onClick={() => setFilter('cancelled')}
              label="Cancelled "
              count={cancelledBookings.length}
            />
          </div>
        </div>

        {/* Booking Cards */}
        {filteredBookings.length > 0 ? (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={() => handleCancel(booking.id)}
                onViewDetails={() => handleViewDetails(booking)}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}

      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

const StatCard = ({ number, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl p-6 overflow-hidden cursor-default"
      style={{
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: isHovered 
          ? '0 12px 28px rgba(255, 107, 53, 0.15)' 
          : '0 4px 12px rgba(255, 107, 53, 0.08)',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(247,147,30,0.05) 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
      
      <div className="relative z-10 text-center">
        <div 
          className="text-5xl font-bold mb-2"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {number}
        </div>
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0.5)',
          transition: 'transform 0.3s',
        }}
      />
    </div>
  );
};

const FilterChip = ({ active, onClick, label, count }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group overflow-hidden"
      style={{
        padding: '12px 28px',
        borderRadius: '50px',
        background: active 
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' 
          : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: !active ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: !active ? 'blur(10px)' : 'none',
        border: active ? 'none' : '1px solid rgba(255, 107, 53, 0.3)',
        color: active ? 'white' : '#FF6B35',
        fontWeight: '600',
        fontSize: '15px',
        cursor: 'pointer',
        boxShadow: active 
          ? '0 8px 24px rgba(255, 107, 53, 0.35)' 
          : isHovered 
            ? '0 6px 20px rgba(255, 107, 53, 0.2)'
            : '0 2px 8px rgba(0,0,0,0.05)',
        transform: isHovered || active ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
          opacity: !active && isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {label}
        <span 
          className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold"
          style={{
            background: active 
              ? 'rgba(255, 255, 255, 0.3)' 
              : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            color: 'white',
          }}
        >
          {count}
        </span>
      </span>

      {!active && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,107,53,0.03) 0%, rgba(247,147,30,0.03) 100%)',
            transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.4s ease',
          }}
        />
      )}
    </button>
  );
};

const EmptyState = ({ filter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="rounded-3xl p-16 text-center relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '2px dashed rgba(255, 107, 53, 0.3)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(247,147,30,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <div 
          className="mx-auto mb-6 flex items-center justify-center"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
            border: '2px solid rgba(255,107,53,0.2)',
          }}
        >
          <span className="text-5xl">✈️</span>
        </div>
        
        <h3 
          className="text-3xl font-bold mb-3"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {filter === 'all' ? "No bookings yet" : `No ${filter} bookings`}
        </h3>
        <p className="text-gray-600 text-base mb-8 max-w-md mx-auto">
          {filter === 'all'
            ? "Start your journey by booking your first flight"
            : `You don't have any ${filter} bookings at the moment`}
        </p>
        
        <a
          href="/flights"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            boxShadow: isHovered 
              ? '0 12px 32px rgba(255,107,53,0.4)' 
              : '0 6px 24px rgba(255,107,53,0.3)',
            transform: isHovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0) scale(1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.4s ease',
            }}
          />
          
          <span className="relative z-10" style={{ fontSize: '20px' }}>✈️</span>
          <span className="relative z-10" style={{ whiteSpace: 'nowrap' }}>Browse Available Flights</span>
          <span 
            className="relative z-10"
            style={{
              fontSize: '20px',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s',
              display: 'inline-block',
            }}
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
};

export default Bookings;