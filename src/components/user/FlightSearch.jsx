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
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.duration);
          const bDuration = parseInt(b.duration);
          return aDuration - bDuration;
        });
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
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.5rem' }}>
          Find Your Perfect Flight
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748B' }}>
          Search and book flights to your dream destination
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch}>
          <div className="search-grid">
            <div className="form-group">
              <label className="form-label">From</label>
              <input
                type="text"
                name="origin"
                value={searchParams.origin}
                onChange={handleInputChange}
                placeholder="City or airport"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">To</label>
              <input
                type="text"
                name="destination"
                value={searchParams.destination}
                onChange={handleInputChange}
                placeholder="City or airport"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={searchParams.departureDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Passengers</label>
              <select
                name="passengers"
                value={searchParams.passengers}
                onChange={handleInputChange}
                className="form-select"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Sort by:</label>
              <select
                name="sortBy"
                value={searchParams.sortBy}
                onChange={handleInputChange}
                className="form-select"
                style={{ width: 'auto' }}
              >
                <option value="price">Price (Low to High)</option>
                <option value="duration">Duration (Shortest)</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Search Flights
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B' }}>
          Available Flights
        </h2>
        <span style={{ color: '#64748B', fontSize: '0.9375rem' }}>
          {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
        </span>
      </div>

      {/* Flights Grid */}
      {filteredFlights.length > 0 ? (
        <div className="flights-grid">
          {filteredFlights.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
              searchParams={searchParams}
            />
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✈️</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1E293B', marginBottom: '0.5rem' }}>
            No flights found
          </h3>
          <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
            Try adjusting your search criteria or browse all available flights.
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-primary"
          >
            Show All Flights
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;