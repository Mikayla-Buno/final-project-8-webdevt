import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const Reports = () => {
  const { user } = useAuth();
  const { getAllBookings, flights } = useBooking();
  const [reportType, setReportType] = useState('revenue');

  const allBookings = getAllBookings(user?.role);
  const confirmedBookings = allBookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = allBookings.filter(b => b.status === 'cancelled');

  // Revenue Report
  const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const averageBookingValue = confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0;
  const totalCancelled = cancelledBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  // Flight Performance
  const flightPerformance = flights.map(flight => {
    const flightBookings = allBookings.filter(b => b.flightId === flight.id && b.status === 'confirmed');
    const revenue = flightBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const bookedSeats = flight.seatCapacity - flight.availableSeats;
    const occupancyRate = (bookedSeats / flight.seatCapacity) * 100;
    
    return {
      ...flight,
      bookings: flightBookings.length,
      revenue,
      bookedSeats,
      occupancyRate
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Passenger Statistics
  const totalPassengers = confirmedBookings.reduce((sum, booking) => sum + booking.passengers, 0);
  const averagePassengersPerBooking = confirmedBookings.length > 0 ? totalPassengers / confirmedBookings.length : 0;

  // Route Analysis
  const routeStats = {};
  confirmedBookings.forEach(booking => {
    const route = `${booking.flight.origin} → ${booking.flight.destination}`;
    if (!routeStats[route]) {
      routeStats[route] = { count: 0, revenue: 0, passengers: 0 };
    }
    routeStats[route].count++;
    routeStats[route].revenue += booking.totalPrice;
    routeStats[route].passengers += booking.passengers;
  });

  const topRoutes = Object.entries(routeStats)
    .map(([route, stats]) => ({ route, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (reportType === 'revenue') {
      csvContent += "Date,Booking Reference,Flight,Route,Passengers,Amount,Status\n";
      confirmedBookings.forEach(booking => {
        csvContent += `${booking.bookingDate},${booking.bookingReference},${booking.flight.flightNumber},"${booking.flight.origin} - ${booking.flight.destination}",${booking.passengers},${booking.totalPrice},${booking.status}\n`;
      });
    } else if (reportType === 'flights') {
      csvContent += "Flight Number,Route,Date,Capacity,Booked,Available,Occupancy Rate,Revenue,Status\n";
      flightPerformance.forEach(flight => {
        csvContent += `${flight.flightNumber},"${flight.origin} - ${flight.destination}",${flight.date},${flight.seatCapacity},${flight.bookedSeats},${flight.availableSeats},${flight.occupancyRate.toFixed(1)}%,${flight.revenue},${flight.status}\n`;
      });
    } else if (reportType === 'passengers') {
      csvContent += "Passenger Count,Number of Bookings,Percentage\n";
      [1,2,3,4,5,6].forEach(passengerCount => {
        const count = confirmedBookings.filter(b => b.passengers === passengerCount).length;
        const percentage = confirmedBookings.length > 0 ? (count / confirmedBookings.length) * 100 : 0;
        csvContent += `${passengerCount},${count},${percentage.toFixed(1)}%\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ohana_${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status) => {
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
        {/* Header Banner */}
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
                <span>📊</span>
                Reports & Analytics
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  color: '#ffffff',
                  fontWeight: '500',
                  textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                Comprehensive insights into your airline operations
              </p>
            </div>
            <ExportButton onClick={generateCSV} />
          </div>
        </div>

        {/* Report Type Selector */}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <ReportButton
              active={reportType === 'revenue'}
              onClick={() => setReportType('revenue')}
              label="Revenue Report"
              icon="💰"
            />
            <ReportButton
              active={reportType === 'flights'}
              onClick={() => setReportType('flights')}
              label="Flight Performance"
              icon="✈️"
            />
            <ReportButton
              active={reportType === 'passengers'}
              onClick={() => setReportType('passengers')}
              label="Passenger Statistics"
              icon="👥"
            />
            <ReportButton
              active={reportType === 'routes'}
              onClick={() => setReportType('routes')}
              label="Route Analysis"
              icon="🗺️"
            />
          </div>
        </div>

        {/* Revenue Report */}
        {reportType === 'revenue' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeSlideUp 0.8s ease-out' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
              }}
            >
              <StatCard
                value={`₱${totalRevenue.toLocaleString()}`}
                label="Total Revenue"
                icon="💵"
                gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
                delay="0s"
              />
              <StatCard
                value={confirmedBookings.length}
                label="Confirmed Bookings"
                icon="✅"
                gradient="linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
                delay="0.1s"
              />
              <StatCard
                value={`₱${averageBookingValue.toFixed(0).toLocaleString()}`}
                label="Avg Booking Value"
                icon="📈"
                gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
                delay="0.2s"
              />
              <StatCard
                value={`₱${totalCancelled.toLocaleString()}`}
                label="Lost Revenue"
                icon="❌"
                gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                delay="0.3s"
              />
            </div>

            <GlassCard title="Recent Bookings" icon="📋">
              <div style={{ overflowX: 'auto' }}>
                {confirmedBookings.slice(0, 10).map((booking, index) => (
                  <BookingRow key={booking.id} booking={booking} index={index} />
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Flight Performance */}
        {reportType === 'flights' && (
          <div style={{ animation: 'fadeSlideUp 0.8s ease-out' }}>
            <GlassCard title="Flight Performance Summary" icon="✈️">
              <div style={{ overflowX: 'auto' }}>
                {flightPerformance.map((flight, index) => (
                  <FlightRow key={flight.id} flight={flight} index={index} getStatusColor={getStatusColor} />
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Passenger Statistics */}
        {reportType === 'passengers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeSlideUp 0.8s ease-out' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
              }}
            >
              <StatCard
                value={totalPassengers}
                label="Total Passengers"
                icon="👥"
                gradient="linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)"
                delay="0s"
              />
              <StatCard
                value={averagePassengersPerBooking.toFixed(1)}
                label="Avg Passengers/Booking"
                icon="📊"
                gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
                delay="0.1s"
              />
              <StatCard
                value={cancelledBookings.length}
                label="Cancelled Bookings"
                icon="🚫"
                gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                delay="0.2s"
              />
            </div>

            <GlassCard title="Booking Distribution by Passenger Count" icon="📊">
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[1, 2, 3, 4, 5, 6].map(passengerCount => {
                  const count = confirmedBookings.filter(b => b.passengers === passengerCount).length;
                  const percentage = confirmedBookings.length > 0 ? (count / confirmedBookings.length) * 100 : 0;
                  
                  return (
                    <PassengerDistribution
                      key={passengerCount}
                      passengerCount={passengerCount}
                      count={count}
                      percentage={percentage}
                    />
                  );
                })}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Route Analysis */}
        {reportType === 'routes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeSlideUp 0.8s ease-out' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
              }}
            >
              <StatCard
                value={Object.keys(routeStats).length}
                label="Active Routes"
                icon="🗺️"
                gradient="linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)"
                delay="0s"
              />
              <StatCard
                value={topRoutes.length > 0 ? topRoutes[0].count : 0}
                label="Most Popular Route"
                icon="🏆"
                gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
                delay="0.1s"
              />
              <StatCard
                value={`₱${topRoutes.length > 0 ? topRoutes[0].revenue.toLocaleString() : 0}`}
                label="Top Route Revenue"
                icon="💎"
                gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
                delay="0.2s"
              />
            </div>

            <GlassCard title="Top 5 Routes by Revenue" icon="🏆">
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {topRoutes.map((route, index) => (
                  <TopRoute key={index} route={route} index={index} topRevenue={topRoutes[0].revenue} />
                ))}
              </div>
            </GlassCard>

            <GlassCard title="All Routes Performance" icon="📊">
              <div style={{ overflowX: 'auto' }}>
                {Object.entries(routeStats)
                  .map(([route, stats]) => ({ route, ...stats }))
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((route, index) => (
                    <RouteRow key={index} route={route} index={index} />
                  ))}
              </div>
            </GlassCard>
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
      `}</style>
    </div>
  );
};

const StatCard = ({ value, label, icon, gradient, delay }) => {
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

const ExportButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        borderRadius: '12px',
        border: 'none',
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        color: 'white',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        boxShadow: isHovered
          ? '0 8px 20px rgba(16, 185, 129, 0.5)'
          : '0 4px 12px rgba(16, 185, 129, 0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export CSV
    </button>
  );
};

const ReportButton = ({ active, onClick, label, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '14px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: active
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
          : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: '#ffffff',
        fontSize: '15px',
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
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
};

const GlassCard = ({ title, icon, children }) => {
  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>{icon}</span>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

const BookingRow = ({ booking, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        padding: '20px 32px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        transition: 'all 0.3s',
        animation: `fadeSlideUp 0.3s ease-out ${index * 0.05}s backwards`,
      }}
    >
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Ref</p>
        <p style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {booking.bookingReference}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Flight</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {booking.flight.flightNumber}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Route</p>
        <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {booking.flight.origin} → {booking.flight.destination}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Passengers</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {booking.passengers}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Amount</p>
        <p style={{ fontSize: '16px', fontWeight: '700', color: '#10B981', textShadow: '0 2px 8px rgba(16, 185, 129, 0.5)' }}>
          ₱{booking.totalPrice.toLocaleString()}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Date</p>
        <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {booking.bookingDate}
        </p>
      </div>
    </div>
  );
};

const FlightRow = ({ flight, index, getStatusColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '16px',
        padding: '20px 32px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        transition: 'all 0.3s',
        animation: `fadeSlideUp 0.3s ease-out ${index * 0.05}s backwards`,
      }}
    >
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Flight</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {flight.flightNumber}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Route</p>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {flight.origin} → {flight.destination}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Date</p>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {flight.date}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Capacity</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {flight.seatCapacity}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Booked</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {flight.bookedSeats}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Occupancy</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
            {flight.occupancyRate.toFixed(1)}%
          </span>
          <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: '10px',
                width: `${flight.occupancyRate}%`,
                background: flight.occupancyRate >= 80 
                  ? 'linear-gradient(90deg, #10B981, #059669)' 
                  : flight.occupancyRate >= 50 
                  ? 'linear-gradient(90deg, #F59E0B, #D97706)' 
                  : 'linear-gradient(90deg, #EF4444, #DC2626)',
                transition: 'width 0.5s ease-out',
              }}
            ></div>
          </div>
        </div>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Revenue</p>
        <p style={{ fontSize: '16px', fontWeight: '700', color: '#10B981', textShadow: '0 2px 8px rgba(16, 185, 129, 0.5)' }}>
          ₱{flight.revenue.toLocaleString()}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Status</p>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            background: `${getStatusColor(flight.status)}33`,
            color: getStatusColor(flight.status),
            border: `1px solid ${getStatusColor(flight.status)}66`,
          }}
        >
          {flight.status}
        </span>
      </div>
    </div>
  );
};

const PassengerDistribution = ({ passengerCount, count, percentage }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <span
        style={{
          width: '140px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#ffffff',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        }}
      >
        {passengerCount} {passengerCount === 1 ? 'Passenger' : 'Passengers'}
      </span>
      <div style={{ flex: 1 }}>
        <div
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            height: '32px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              width: `${percentage}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '12px',
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
            }}
          >
            {percentage > 10 && (
              <span
                style={{
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: '700',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                {percentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      </div>
      <span
        style={{
          width: '100px',
          textAlign: 'right',
          fontSize: '14px',
          fontWeight: '700',
          color: '#ffffff',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        }}
      >
        {count} bookings
      </span>
    </div>
  );
};

const TopRoute = ({ route, index, topRevenue }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '20px',
        borderRadius: '16px',
        background: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s',
        animation: `fadeSlideUp 0.4s ease-out ${index * 0.1}s backwards`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            }}
          >
            {index + 1}
          </div>
          <div>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '4px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {route.route}
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}
            >
              {route.count} bookings • {route.passengers} passengers
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#10B981',
              textShadow: '0 2px 10px rgba(16, 185, 129, 0.5)',
              marginBottom: '4px',
            }}
          >
            ₱{route.revenue.toLocaleString()}
          </p>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.7)',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            }}
          >
            ₱{Math.round(route.revenue / route.passengers).toLocaleString()} per passenger
          </p>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          height: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #10B981, #059669)',
            width: `${(route.revenue / topRevenue) * 100}%`,
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.5)',
          }}
        ></div>
      </div>
    </div>
  );
};

const RouteRow = ({ route, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '16px',
        padding: '20px 32px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        transition: 'all 0.3s',
        animation: `fadeSlideUp 0.3s ease-out ${index * 0.05}s backwards`,
      }}
    >
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Route</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {route.route}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Bookings</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {route.count}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Passengers</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          {route.passengers}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Revenue</p>
        <p style={{ fontSize: '16px', fontWeight: '700', color: '#10B981', textShadow: '0 2px 8px rgba(16, 185, 129, 0.5)' }}>
          ₱{route.revenue.toLocaleString()}
        </p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px', textTransform: 'uppercase' }}>Avg/Passenger</p>
        <p style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
          ₱{Math.round(route.revenue / route.passengers).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Reports;