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

  // Always get fresh bookings from context
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F0 25%, #FFE8DC 50%, #FFF5F0 75%, #FFFFFF 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center" style={{ animation: 'fadeSlideDown 0.6s ease-out' }}>
          <h1 
            className="text-5xl md:text-6xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            My Bookings
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            View and manage your booked flights
          </p>
        </div>

        {/* Stats Cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          style={{ animation: 'fadeSlideUp 0.7s ease-out' }}
        >
          <StatsCard
            number={userBookings.length}
            label="Total Bookings"
            delay="0s"
          />
          <StatsCard
            number={confirmedBookings.length}
            label="Confirmed"
            delay="0.1s"
          />
          <StatsCard
            number={cancelledBookings.length}
            label="Cancelled"
            delay="0.2s"
          />
        </div>

        {/* Filter Section */}
        <div 
          className="mb-10"
          style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
        >
          <div
            className="rounded-2xl p-6 backdrop-blur-xl border"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 107, 53, 0.15)',
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.08)',
            }}
          >
            <div className="flex flex-wrap gap-3">
              <FilterButton
                active={filter === 'all'}
                onClick={() => setFilter('all')}
                label={`All`}
                count={userBookings.length}
              />
              <FilterButton
                active={filter === 'confirmed'}
                onClick={() => setFilter('confirmed')}
                label={`Confirmed`}
                count={confirmedBookings.length}
              />
              <FilterButton
                active={filter === 'cancelled'}
                onClick={() => setFilter('cancelled')}
                label={`Cancelled`}
                count={cancelledBookings.length}
              />
            </div>
          </div>
        </div>

        {/* Booking Cards Grid */}
        {filteredBookings.length > 0 ? (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ animation: 'fadeSlideUp 0.9s ease-out' }}
          >
            {filteredBookings.map((booking, index) => (
              <div
                key={booking.id}
                style={{
                  animation: `fadeSlideUp 0.5s ease-out ${index * 0.08}s backwards`,
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

const StatsCard = ({ number, label, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl p-8 relative overflow-hidden cursor-default"
      style={{
        background: 'white',
        border: '1px solid rgba(255, 107, 53, 0.15)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(255, 107, 53, 0.15)' 
          : '0 8px 24px rgba(255, 107, 53, 0.08)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeSlideUp 0.7s ease-out ${delay}`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,107,53,0.03) 0%, rgba(247,147,30,0.03) 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div 
          className="text-6xl font-bold mb-3"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {number}
        </div>
        <div className="text-base font-semibold text-gray-600">
          {label}
        </div>
      </div>

      {/* Decorative gradient line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.4s',
          transformOrigin: 'left',
        }}
      />
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
      className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300"
      style={{
        background: active 
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' 
          : isHovered 
            ? 'rgba(255,107,53,0.08)'
            : 'white',
        color: active ? 'white' : '#FF6B35',
        border: `2px solid ${active ? 'transparent' : 'rgba(255,107,53,0.2)'}`,
        boxShadow: active 
          ? '0 8px 20px rgba(255,107,53,0.3)' 
          : isHovered 
            ? '0 4px 15px rgba(255,107,53,0.1)'
            : '0 2px 8px rgba(0,0,0,0.05)',
        transform: isHovered || active ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <span>{label}</span>
      <span 
        className="px-3 py-1 rounded-full text-sm font-bold"
        style={{
          background: active 
            ? 'rgba(255,255,255,0.25)' 
            : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          color: 'white',
        }}
      >
        {count}
      </span>
    </button>
  );
};

const EmptyState = ({ filter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="text-center py-20 rounded-3xl relative overflow-hidden"
      style={{
        background: 'white',
        border: '2px dashed rgba(255,107,53,0.2)',
        animation: 'fadeSlideUp 0.6s ease-out',
      }}
    >
      {/* Content */}
      <div className="relative z-10 px-6">
        <div 
          className="mx-auto mb-6 flex items-center justify-center"
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(247,147,30,0.1) 100%)',
            border: '3px solid rgba(255,107,53,0.15)',
          }}
        >
          <span className="text-6xl">✈️</span>
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
          {filter === 'all' ? "No bookings found" : `No ${filter} bookings`}
        </h3>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          {filter === 'all'
            ? "Ready to explore the world? Book your first flight and start your adventure!"
            : `You currently have no ${filter} bookings.`}
        </p>
        
        <a
          href="/flights"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            boxShadow: isHovered 
              ? '0 12px 30px rgba(255,107,53,0.4)' 
              : '0 6px 20px rgba(255,107,53,0.3)',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          <span>Book Your First Flight</span>
          <span>→</span>
        </a>
      </div>

      {/* Decorative corner gradients */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle at top left, rgba(255,107,53,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle at bottom right, rgba(247,147,30,0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default Bookings;