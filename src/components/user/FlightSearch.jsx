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

    // Sort results
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
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#ffffffff' }}>
          Find Your Perfect Flight
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#ffffffff' }}>
          Search and book flights to your dream destination with ease
        </p>
      </div>

      {/* Search Form */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto 3rem auto',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
          transition: 'all 0.3s ease',
        }}
      >
        <form onSubmit={handleSearch}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            {/* From */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#F97316' }}>From</label>
              <input
                type="text"
                name="origin"
                value={searchParams.origin}
                onChange={handleInputChange}
                placeholder="City or airport"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(249,115,22,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#1F2937',
                  outline: 'none',
                }}
              />
            </div>

            {/* To */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#F97316' }}>To</label>
              <input
                type="text"
                name="destination"
                value={searchParams.destination}
                onChange={handleInputChange}
                placeholder="City or airport"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(249,115,22,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#1F2937',
                  outline: 'none',
                }}
              />
            </div>

            {/* Departure Date */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#F97316' }}>Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={searchParams.departureDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(249,115,22,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#1F2937',
                  outline: 'none',
                }}
              />
            </div>

            {/* Passengers */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#F97316' }}>Passengers</label>
              <select
                name="passengers"
                value={searchParams.passengers}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(249,115,22,0.5)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#1F2937',
                  outline: 'none',
                }}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={clearFilters}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                background: 'rgba(249,115,22,0.25)',
                color: '#1F2937',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(249,115,22,0.5)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(249,115,22,0.25)'}
            >
              Clear
            </button>

            <button
              type="submit"
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '1rem',
                border: 'none',
                background: 'linear-gradient(135deg, #F97316, #C2410C)',
                color: '#FFFFFF',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform='scale(1.05)';
                e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform='scale(1)';
                e.currentTarget.style.boxShadow='none';
              }}
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ffffffff' }}>Available Flights</h2>
        <span style={{ color: '#6B7280', fontSize: '0.9375rem' }}>
          {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
        </span>
      </div>

      {/* Flights Grid */}
      {filteredFlights.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredFlights.map(flight => (
            <FlightCard key={flight.id} flight={flight} searchParams={searchParams} />
          ))}
        </div>
      ) : (
        <div style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1F2937', marginBottom: '1rem' }}>No flights found</h3>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>Try adjusting your search criteria or browse all available flights.</p>
          <button
            onClick={clearFilters}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '1rem',
              border: 'none',
              background: 'linear-gradient(135deg, #F97316, #C2410C)',
              color: '#FFFFFF',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform='scale(1.05)';
              e.currentTarget.style.boxShadow='0 8px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform='scale(1)';
              e.currentTarget.style.boxShadow='none';
            }}
          >
            Show All Flights
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
