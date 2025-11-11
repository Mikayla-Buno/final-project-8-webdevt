import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserBookings, flights } = useBooking();

  // Get confirmed bookings for this user
  const userBookings = getUserBookings(user?.id).filter(b => b.status === 'confirmed');

  // Map bookings to flight details
  const upcomingTrips = userBookings
    .map(booking => {
      const flight = flights.find(f => f.id === booking.flightId);
      return {
        ...booking,
        origin: flight?.origin,
        destination: flight?.destination,
        date: flight?.date,
        time: flight?.departureTime,
        flightNumber: flight?.flightNumber
      };
    })
    .filter(trip => trip.date && new Date(trip.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Show next 5 available flights
  const upcomingFlights = flights
    .filter(flight => new Date(flight.date) >= new Date())
    .slice(0, 5);

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: `url('images/home.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Welcome Banner - TRUE Glass Design */}
      <div 
        className="mb-10 shadow-lg"
        style={{
          borderRadius: '24px',
          padding: '48px 32px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          maxWidth: '1280px',
          margin: '0 auto 40px',
          animation: 'fadeSlideDown 0.6s ease-out',
        }}
      >
        <h1 
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          Welcome aboard, {user?.name || 'Traveler'}! ✈️
        </h1>
        <p 
          style={{ 
            fontSize: '18px',
            color: '#ffffff',
            fontWeight: '500',
            textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          }}
        >
          {upcomingTrips.length > 0
            ? `You have ${upcomingTrips.length} upcoming ${upcomingTrips.length === 1 ? 'trip' : 'trips'} booked with Ohana Airlines.`
            : 'Ready to discover your next destination?'}
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Statistics Overview - TRUE Glass Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <StatCard 
            value={upcomingTrips.length}
            label="Upcoming Trips"
            icon="✈️"
            delay="0s"
            gradient="linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
          />
          <StatCard 
            value={upcomingFlights.length}
            label="Available Flights"
            icon="🕐"
            delay="0.1s"
            gradient="linear-gradient(135deg, #2A9D8F 0%, #A9D6E5 100%)"
          />
          <StatCard 
            value={upcomingTrips.reduce((total, booking) => total + booking.passengers, 0)}
            label="Total Passengers"
            icon="👥"
            delay="0.2s"
            gradient="linear-gradient(135deg, #446775 0%, #2A9D8F 100%)"
          />
        </div>

        {/* Two Column Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Upcoming Trips Card - TRUE Glass */}
          <div
            style={{
              borderRadius: '24px',
              padding: '32px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              animation: 'fadeSlideUp 0.8s ease-out',
            }}
          >
            <h2 
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span>🧳</span>
              Your Upcoming Trips
            </h2>

            {upcomingTrips.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                {upcomingTrips.slice(0, 4).map((booking, index) => (
                  <TripCard key={booking.id} booking={booking} index={index} />
                ))}
              </div>
            ) : (
              <EmptyTripState />
            )}
          </div>

          {/* Available Flights Card - TRUE Glass */}
          <div
            style={{
              borderRadius: '24px',
              padding: '32px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              animation: 'fadeSlideUp 0.9s ease-out',
            }}
          >
            <h2 
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span>🌍</span>
              Available Flights
            </h2>

            {upcomingFlights.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                {upcomingFlights.map((flight, index) => (
                  <FlightCard key={flight.id} flight={flight} index={index} />
                ))}
              </div>
            ) : (
              <EmptyFlightState />
            )}
          </div>
        </div>
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
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '48px',
        opacity: 0.2,
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '12px',
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        position: 'relative',
        zIndex: 1,
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        color: '#ffffff',
        position: 'relative',
        zIndex: 1,
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
      }}>
        {label}
      </div>
    </div>
  );
};

const TripCard = ({ booking, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '20px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered 
          ? '0 8px 20px rgba(0, 0, 0, 0.15)' 
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
        animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s backwards`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontWeight: '700', 
            fontSize: '18px',
            color: '#ffffff',
            marginBottom: '8px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}>
            Flight #{booking.flightNumber}
          </h3>
          <p style={{ 
            fontSize: '15px', 
            color: '#ffffff',
            fontWeight: '500',
            marginBottom: '8px',
            textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
          }}>
            {booking.origin} → {booking.destination}
          </p>
          <p style={{ 
            fontSize: '13px', 
            color: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}>
            <span>📅</span>
            {new Date(booking.date).toLocaleDateString()} • {booking.time}
          </p>
        </div>
        <div
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          }}
        >
          Confirmed
        </div>
      </div>
    </div>
  );
};

const FlightCard = ({ flight, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '20px',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered 
          ? '0 8px 20px rgba(0, 0, 0, 0.15)' 
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
        animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s backwards`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontWeight: '700', 
            fontSize: '18px',
            color: '#ffffff',
            marginBottom: '8px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}>
            {flight.origin} → {flight.destination}
          </h3>
          <p style={{ 
            fontSize: '13px', 
            color: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}>
            <span>📅</span>
            {new Date(flight.date).toLocaleDateString()} • {flight.departureTime}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ 
            fontWeight: '700',
            fontSize: '24px',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            marginBottom: '4px',
          }}>
            ₱{flight.price.toLocaleString()}
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: 'rgba(255, 255, 255, 0.8)',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}>
            per passenger
          </p>
        </div>
      </div>
    </div>
  );
};

const EmptyTripState = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '2px dashed rgba(255, 255, 255, 0.3)',
    }}>
      <div style={{
        fontSize: '64px',
        marginBottom: '16px',
        opacity: 0.7,
      }}>
        ✈️
      </div>
      <p style={{ 
        color: '#ffffff', 
        marginBottom: '24px',
        fontSize: '15px',
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
      }}>
        You don't have any upcoming trips yet.
      </p>
      <Link 
        to="/flights"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '14px',
          color: 'white',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          boxShadow: isHovered 
            ? '0 8px 20px rgba(255, 107, 53, 0.4)' 
            : '0 4px 12px rgba(255, 107, 53, 0.3)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'all 0.3s',
        }}
      >
        Book a Flight
      </Link>
    </div>
  );
};

const EmptyFlightState = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '2px dashed rgba(255, 255, 255, 0.3)',
    }}>
      <div style={{
        fontSize: '64px',
        marginBottom: '16px',
        opacity: 0.7,
      }}>
        🌍
      </div>
      <p style={{ 
        color: '#ffffff',
        fontSize: '15px',
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
      }}>
        No available flights at the moment.
      </p>
    </div>
  );
};

export default Dashboard;