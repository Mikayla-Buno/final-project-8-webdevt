import React, { useState } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';

const BookingForm = ({ flight, onCancel, onSuccess }) => {
  const { bookFlight } = useBooking();
  const { user } = useAuth();

  const [passengers, setPassengers] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([
    { name: user?.name || '', age: '', seat: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const handlePassengerChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };

  const handlePassengerCountChange = (count) => {
    setPassengers(count);
    const newDetails = [];
    for (let i = 0; i < count; i++) {
      if (i < passengerDetails.length) {
        newDetails.push(passengerDetails[i]);
      } else {
        newDetails.push({ name: '', age: '', seat: '' });
      }
    }
    setPassengerDetails(newDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      flightId: flight.id,
      userId: user.id,
      passengers,
      totalPrice: flight.price * passengers,
      passengerDetails
    };

    const result = await bookFlight(bookingData);
    setLoading(false);

    if (result.success) {
      onSuccess(result.booking);
    } else {
      alert('Booking failed: ' + result.error);
    }
  };

  const totalPrice = flight.price * passengers;

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '2rem auto',
        borderRadius: '1.5rem',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        padding: '2rem'
      }}
    >
      {/* Heading */}
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#FFF',
        }}
      >
        Book Flight {flight.flightNumber}
      </h3>

      {/* Flight Info */}
      <div
        style={{
          padding: '1.5rem',
          marginBottom: '2rem',
          borderRadius: '1.5rem',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <p style={{ marginBottom: '0.5rem', color: '#FFF' }}>
          <strong>Route:</strong> {flight.origin} → {flight.destination}
        </p>
        <p style={{ marginBottom: '0.5rem', color: '#FFF' }}>
          <strong>Date:</strong> {flight.date} | <strong>Time:</strong> {flight.departureTime} - {flight.arrivalTime}
        </p>
        <p style={{ color: '#FFF' }}>
          <strong>Duration:</strong> {flight.duration} | <strong>Aircraft:</strong> {flight.aircraft}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Number of Passengers */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#FFB347' }}>
            Number of Passengers
          </label>
          <select
            value={passengers}
            onChange={(e) => handlePassengerCountChange(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.05)',
              color: '#FFF',
              outline: 'none'
            }}
          >
            {[1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
            ))}
          </select>
        </div>

        {/* Passenger Details */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', fontWeight: '700', color: '#FFB347' }}>Passenger Details</h4>
          {passengerDetails.map((passenger, index) => (
            <div
              key={index}
              style={{
                padding: '1rem',
                borderRadius: '1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.2)',
                marginBottom: '1rem'
              }}
            >
              <h5 style={{ marginBottom: '0.75rem', fontWeight: '600', color: '#FFF' }}>Passenger {index + 1}</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#FFB347' }}>Full Name</label>
                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#FFF',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#FFB347' }}>Age</label>
                  <input
                    type="number"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    min="1"
                    max="120"
                    required
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#FFF',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderRadius: '1.5rem',
            marginBottom: '2rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#FFF' }}>Total Price:</span>
          <span style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #FFB347, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ₱{totalPrice.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255,69,58,0.5)',
              background: 'transparent',
              color: '#FF453A',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,58,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'transparent',
              color: '#FFF',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
