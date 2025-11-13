import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';
import ConfirmationModal from './ConfirmationModal';

const FlightCard = ({ flight, searchParams }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookFlight } = useBooking();
  const [showModal, setShowModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([
    { name: user?.name || '', age: '', seat: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
    setShowBookingForm(false);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to book a flight');
      navigate('/login');
      return;
    }

    if (flight.status === 'Cancelled' || flight.availableSeats === 0) {
      return;
    }

    setShowBookingForm(true);
  };

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
      setShowModal(false);
      setConfirmedBooking(result.booking);
      setShowConfirmation(true);
    } else {
      alert('Booking failed: ' + result.error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'On Time': return 'status-on-time';
      case 'Delayed': return 'status-delayed';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-on-time';
    }
  };

  const isBookable = flight.status !== 'Cancelled' && flight.availableSeats > 0;
  const totalPrice = flight.price * passengers;

  return (
    <>
      <div className="flight-card" onClick={handleCardClick}>
        {/* Flight Image */}
        <div style={{ position: 'relative' }}>
          <img
            src={flight.image}
            alt={`${flight.origin} to ${flight.destination}`}
            className="flight-image"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
            }}
          />
          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <span className={getStatusClass(flight.status)}>
              {flight.status}
            </span>
          </div>
        </div>

        {/* Flight Content */}
        <div className="flight-card-content">
          <div className="flight-header">
            <div>
              <div className="flight-number">{flight.flightNumber}</div>
              <div style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '0.25rem' }}>
                {flight.aircraft}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="flight-price">₱{flight.price.toLocaleString()}</div>
              <div className="flight-price-label">per person</div>
            </div>
          </div>

          <div className="flight-route">
            <span className="flight-route-text">{flight.origin}</span>
            <span className="flight-arrow">→</span>
            <span className="flight-route-text">{flight.destination}</span>
          </div>

          <div className="flight-details">
            <div className="flight-detail-item">
              <span className="flight-detail-label">Date</span>
              <span className="flight-detail-value">{flight.date}</span>
            </div>
            <div className="flight-detail-item">
              <span className="flight-detail-label">Duration</span>
              <span className="flight-detail-value">{flight.duration}</span>
            </div>
            <div className="flight-detail-item">
              <span className="flight-detail-label">Departure</span>
              <span className="flight-detail-value">{flight.departureTime}</span>
            </div>
            <div className="flight-detail-item">
              <span className="flight-detail-label">Available</span>
              <span className="flight-detail-value">{flight.availableSeats} seats</span>
            </div>
          </div>

          <button
            onClick={handleBookClick}
            disabled={!isBookable}
            className={`btn ${isBookable ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {flight.status === 'Cancelled' ? 'Flight Cancelled' :
             flight.availableSeats === 0 ? 'Fully Booked' : 'View Details & Book'}
          </button>
        </div>
      </div>

      {/* Modal with Flight Details and Booking Form */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="modal-header">
              <h2 className="modal-title">Flight Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {/* Flight Image */}
              <img
                src={flight.image}
                alt={`${flight.origin} to ${flight.destination}`}
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.5rem' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                }}
              />

              {/* Flight Info Header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {flight.flightNumber}
                  </h3>
                  <p style={{ color: '#64748B' }}>{flight.aircraft}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>
                    ₱{flight.price.toLocaleString()}
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.875rem' }}>per passenger</p>
                </div>
              </div>

              {/* Flight Timeline */}
              <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                      {flight.departureTime}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748B' }}>{flight.origin}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                      {flight.date}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.5rem' }}>
                      {flight.duration}
                    </div>
                    <div style={{ width: '100%', height: '2px', background: '#CBD5E1', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#3B82F6', borderRadius: '50%', width: '1.5rem', height: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem' }}>
                        ✈
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                      Direct
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                      {flight.arrivalTime}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748B' }}>{flight.destination}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                      {flight.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {flight.description && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>About this flight</h4>
                  <p style={{ color: '#64748B', lineHeight: '1.6' }}>{flight.description}</p>
                </div>
              )}

              {/* Amenities */}
              {flight.amenities && flight.amenities.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>Amenities</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {flight.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#EFF6FF',
                          color: '#3B82F6',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Seat Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', padding: '1rem', background: '#F8FAFC', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.25rem' }}>
                    Seat Capacity
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {flight.seatCapacity} seats
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '0.25rem' }}>
                    Available Seats
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600', color: flight.availableSeats < 10 ? '#EF4444' : '#10B981' }}>
                    {flight.availableSeats} seats
                  </div>
                </div>
              </div>

              {/* Booking Form (Shows when Book button is clicked) */}
              {showBookingForm && isBookable && (
                <form onSubmit={handleSubmit} style={{ 
                  padding: '2rem', 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                  borderRadius: '1rem',
                  border: '2px solid rgba(59, 130, 246, 0.2)',
                  marginTop: '2rem'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1E293B' }}>
                    Complete Your Booking
                  </h3>

                  {/* Number of Passengers */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>
                      Number of Passengers
                    </label>
                    <select
                      value={passengers}
                      onChange={(e) => handlePassengerCountChange(parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #CBD5E1',
                        background: 'white',
                        color: '#1E293B',
                        outline: 'none',
                        fontSize: '1rem'
                      }}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Passenger Details */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem', fontWeight: '700', color: '#475569' }}>Passenger Details</h4>
                    {passengerDetails.map((passenger, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.75rem',
                          background: 'white',
                          border: '1px solid #E2E8F0',
                          marginBottom: '1rem'
                        }}
                      >
                        <h5 style={{ marginBottom: '0.75rem', fontWeight: '600', color: '#1E293B' }}>Passenger {index + 1}</h5>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#64748B' }}>
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={passenger.name}
                              onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                              required
                              style={{
                                width: '100%',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #CBD5E1',
                                background: 'white',
                                color: '#1E293B',
                                outline: 'none'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', fontWeight: '500', color: '#64748B' }}>
                              Age
                            </label>
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
                                borderRadius: '0.5rem',
                                border: '1px solid #CBD5E1',
                                background: 'white',
                                color: '#1E293B',
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
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      marginBottom: '1.5rem',
                      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>Total Price:</span>
                    <span style={{ fontSize: '2rem', fontWeight: '700' }}>
                      ₱{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </form>
              )}
            </div>

            {/* Modal Footer (only shows if booking form is not active) */}
            {!showBookingForm && (
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button
                  className={`btn ${isBookable ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={handleBookClick}
                  disabled={!isBookable}
                >
                  {flight.status === 'Cancelled' ? 'Flight Cancelled' :
                   flight.availableSeats === 0 ? 'Fully Booked' : 'Book This Flight'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && confirmedBooking && (
        <ConfirmationModal
          booking={confirmedBooking}
          onClose={() => {
            setShowConfirmation(false);
            navigate('/bookings');
          }}
          onPrint={() => window.print()}
        />
      )}
    </>
  );
};

export default FlightCard;