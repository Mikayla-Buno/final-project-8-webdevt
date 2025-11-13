import React, { useState, useEffect } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import FlightCard from '../booking/FlightCard';

const FlightSearch = () => {
  const { flights } = useBooking();
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    passengers: 1,
    sortBy: 'price'
  });

  useEffect(() => {
    setFilteredFlights(flights);
  }, [flights]);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = flights.filter(flight => {
      const matchesOrigin = searchParams.origin ?
        flight.origin.toLowerCase().includes(searchParams.origin.toLowerCase()) : true;
      const matchesDestination = searchParams.destination ?
        flight.destination.toLowerCase().includes(searchParams.destination.toLowerCase()) : true;
      const matchesDate = searchParams.departureDate ?
        flight.date === searchParams.departureDate : true;
      return matchesOrigin && matchesDestination && matchesDate;
    });

    switch (searchParams.sortBy) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case 'departure':
        filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      default:
        break;
    }

    setFilteredFlights(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setSearchParams({
      origin: '',
      destination: '',
      departureDate: '',
      passengers: 1,
      sortBy: 'price'
    });
    setFilteredFlights(flights);
  };

  return (
    <div style={{
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
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center', animation: 'fadeSlideDown 0.6s ease-out' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#ffffff',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em'
          }}>
            Find Your Perfect Flight
          </h1>
          <p style={{ fontSize: '18px', color: '#ffffff', fontWeight: '500', textShadow: '0 1px 8px rgba(0, 0, 0, 0.2)' }}>
            Search and book flights to your dream destination with ease
          </p>
        </div>

        {/* Search Form */}
        <div style={{
          borderRadius: '24px',
          padding: '32px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          marginBottom: '48px',
          animation: 'fadeSlideUp 0.7s ease-out'
        }}>
          <form onSubmit={handleSearch}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <FormField 
                label="From" 
                name="origin" 
                value={searchParams.origin} 
                onChange={handleInputChange}
                placeholder="City or airport"
                icon="🛫"
              />
              <FormField 
                label="To" 
                name="destination" 
                value={searchParams.destination} 
                onChange={handleInputChange}
                placeholder="City or airport"
                icon="🛬"
              />
              <FormField 
                label="Departure Date" 
                name="departureDate" 
                type="date"
                value={searchParams.departureDate} 
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                icon="📅"
              />
              <FormField 
                label="Passengers" 
                name="passengers" 
                value={searchParams.passengers} 
                onChange={handleInputChange}
                select
                options={[1,2,3,4,5,6]}
                icon="👥"
              />
              <FormField 
                label="Sort By" 
                name="sortBy" 
                value={searchParams.sortBy} 
                onChange={handleInputChange}
                select
                options={[
                  { value: 'price', label: 'Price (Low to High)' },
                  { value: 'duration', label: 'Duration (Shortest)' },
                  { value: 'departure', label: 'Departure Time' }
                ]}
                icon="🔄"
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <ActionButton onClick={clearFilters} type="button" secondary>
                Clear Filters
              </ActionButton>
              <ActionButton type="submit">
                🔍 Search Flights
              </ActionButton>
            </div>
          </form>
        </div>

        {/* Results Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          padding: '20px 24px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          animation: 'fadeSlideUp 0.8s ease-out'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}>
            Available Flights
          </h2>
          <span style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '14px',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
          }}>
            {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
          </span>
        </div>

        {/* Flights Grid */}
        {filteredFlights.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            animation: 'fadeSlideUp 0.9s ease-out'
          }}>
            {filteredFlights.map(flight => (
              <FlightCard key={flight.id} flight={flight} searchParams={searchParams} />
            ))}
          </div>
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, type = 'text', placeholder, select, options, icon, min }) => {
  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#ffffff',
        fontSize: '14px',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        {icon && <span>{icon}</span>}
        {label}
      </label>
      {select ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
          }}
        >
          {Array.isArray(options) && typeof options[0] === 'object' ? (
            options.map(opt => (
              <option key={opt.value} value={opt.value} style={{ background: '#1F2937', color: '#ffffff' }}>
                {opt.label}
              </option>
            ))
          ) : (
            options.map(opt => (
              <option key={opt} value={opt} style={{ background: '#1F2937', color: '#ffffff' }}>
                {typeof opt === 'number' ? `${opt} ${opt === 1 ? 'Passenger' : 'Passengers'}` : opt}
              </option>
            ))
          )}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
            fontWeight: '500',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
          }}
        />
      )}
    </div>
  );
};

const ActionButton = ({ children, onClick, type = 'button', secondary }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '12px 28px',
        borderRadius: '12px',
        border: secondary ? '2px solid rgba(255, 255, 255, 0.3)' : 'none',
        background: secondary 
          ? (isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)')
          : 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        color: '#ffffff',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontSize: '15px',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        boxShadow: secondary 
          ? 'none' 
          : (isHovered ? '0 6px 20px rgba(255, 107, 53, 0.5)' : '0 4px 12px rgba(255, 107, 53, 0.4)'),
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
      }}
    >
      {children}
    </button>
  );
};

const EmptyState = ({ onClear }) => {
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
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
        fontSize: '48px'
      }}>
        ✈️
      </div>
      
      <h3 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#ffffff',
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
      }}>
        No flights found
      </h3>
      <p style={{
        color: '#ffffff',
        fontSize: '16px',
        marginBottom: '32px',
        maxWidth: '400px',
        margin: '0 auto 32px',
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
      }}>
        Try adjusting your search criteria or browse all available flights.
      </p>
      <button
        onClick={onClear}
        style={{
          padding: '14px 32px',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          color: 'white',
          fontWeight: '700',
          fontSize: '15px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.4)';
        }}
      >
        Show All Flights
      </button>
    </div>
  );
};

export default FlightSearch;
      