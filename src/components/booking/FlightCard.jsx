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
            onClick={setShowModal}
            disabled={!isBookable}
            className={`btn ${isBookable ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {flight.status === 'Cancelled' ? 'Flight Cancelled' :
             flight.availableSeats === 0 ? 'Fully Booked' : 'View Details & Book'}
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div 
          className="modal-overlay" 
          onClick={() => setShowModal(false)}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '1000px', 
              maxHeight: '90vh', 
              overflowY: 'auto',
              borderRadius: '24px',
              padding: 0,
            }}
          >
            {/* Modal Header with Image */}
            <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
              <img
                src={flight.image}
                alt="Flight"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
              }} />
              
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#1E293B',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                }}
              >
                ✕
              </button>

              {/* Header Content */}
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '40px',
                right: '40px',
                color: 'white',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      Flight {flight.flightNumber}
                    </h2>
                    <p style={{ fontSize: '18px', opacity: 0.95, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                      {flight.aircraft}
                    </p>
                  </div>
                  <div style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    background: flight.status === 'On Time' 
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : flight.status === 'Delayed'
                      ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                      : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                    fontWeight: '700',
                    fontSize: '16px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}>
                    {flight.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '40px' }}>
              {/* Flight Route & Price Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '30px',
                alignItems: 'center',
                marginBottom: '40px',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
                borderRadius: '20px',
                border: '2px solid rgba(59, 130, 246, 0.2)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                }}>
                  {/* Departure */}
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Departure
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#1E293B', marginBottom: '4px' }}>
                      {flight.departureTime}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#3B82F6' }}>
                      {flight.origin}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                      {new Date(flight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Flight Timeline */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: '120px',
                  }}>
                    <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>
                      {flight.duration}
                    </div>
                    <div style={{
                      width: '100%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                      position: 'relative',
                      borderRadius: '10px',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
                      }}>
                        ✈
                      </div>
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#10B981',
                      fontWeight: '700',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}>
                      Direct Flight
                    </div>
                  </div>

                  {/* Arrival */}
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Arrival
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: '800', color: '#1E293B', marginBottom: '4px' }}>
                      {flight.arrivalTime}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '600', color: '#8B5CF6' }}>
                      {flight.destination}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                      {new Date(flight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                {/* Price Box */}
                <div style={{
                  textAlign: 'right',
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}>
                  <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '4px' }}>
                    Starting from
                  </div>
                  <div style={{ fontSize: '42px', fontWeight: '800', color: '#3B82F6', lineHeight: 1 }}>
                    ₱{flight.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                    per passenger
                  </div>
                </div>
              </div>

              {/* Description */}
              {flight.description && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#1E293B' }}>
                    About This Flight
                  </h3>
                  <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '1.7' }}>
                    {flight.description}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {flight.amenities && flight.amenities.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1E293B' }}>
                    ✨ Amenities & Services
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    {flight.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '14px 18px',
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          borderRadius: '12px',
                          fontSize: '15px',
                          fontWeight: '600',
                          color: 'D97706',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>✓</span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seat Availability */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                padding: '24px',
                background: '#F8FAFC',
                borderRadius: '16px',
                marginBottom: '40px',
              }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>
                    Total Capacity
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
                    {flight.seatCapacity} seats
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>
                    Available Seats
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: flight.availableSeats < 10 ? '#EF4444' : '#10B981',
                  }}>
                    {flight.availableSeats} seats
                  </div>
                  {flight.availableSeats < 10 && (
                    <div style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#EF4444',
                      fontWeight: '600',
                      display: 'inline-block',
                    }}>
                      ⚠️ Limited seats available
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Form */}
              {showBookingForm && isBookable ? (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    padding: '40px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(99, 102, 241, 0.03) 100%)',
                    borderRadius: '20px',
                    border: '2px solid rgba(59, 130, 246, 0.15)',
                  }}
                >
                  <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '30px', color: '#1E293B' }}>
                    🎫 Complete Your Booking
                  </h3>

                  {/* Passengers Select */}
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#475569',
                    }}>
                      Number of Passengers
                    </label>
                    <select
                      value={passengers}
                      onChange={(e) => handlePassengerCountChange(parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '2px solid #E2E8F0',
                        background: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1E293B',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Passenger Details */}
                  <div style={{ marginBottom: '30px' }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      marginBottom: '20px',
                      color: '#475569',
                    }}>
                      👤 Passenger Information
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {passengerDetails.map((passenger, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '24px',
                            background: 'white',
                            borderRadius: '16px',
                            border: '2px solid #E2E8F0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }}
                        >
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#3B82F6',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}>
                            Passenger {index + 1}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                            <div>
                              <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#64748B',
                              }}>
                                Full Name *
                              </label>
                              <input
                                type="text"
                                value={passenger.name}
                                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                required
                                placeholder="Enter full name"
                                style={{
                                  width: '100%',
                                  padding: '12px 16px',
                                  borderRadius: '10px',
                                  border: '2px solid #E2E8F0',
                                  fontSize: '15px',
                                  color: '#1E293B',
                                  outline: 'none',
                                  transition: 'all 0.3s',
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                              />
                            </div>
                            <div>
                              <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#64748B',
                              }}>
                                Age *
                              </label>
                              <input
                                type="number"
                                value={passenger.age}
                                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                required
                                min="1"
                                max="120"
                                placeholder="Age"
                                style={{
                                  width: '100%',
                                  padding: '12px 16px',
                                  borderRadius: '10px',
                                  border: '2px solid #E2E8F0',
                                  fontSize: '15px',
                                  color: '#1E293B',
                                  outline: 'none',
                                  transition: 'all 0.3s',
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total Price */}
                  <div style={{
                    padding: '30px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg,  #FF6B35 0%, #F7931E 100%)',
                    color: 'white',
                    marginBottom: '30px',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '8px' }}>
                          Total Amount
                        </div>
                        <div style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1 }}>
                          ₱{totalPrice.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>
                          {passengers} × ₱{flight.price.toLocaleString()}
                        </div>
                        <div style={{
                          padding: '8px 16px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}>
                          Economy Class
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '20px',
                      borderRadius: '14px',
                      border: 'none',
                      background: loading 
                        ? '#94A3B8'
                        : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '700',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    {loading ? '⏳ Processing...' : '🎉 Confirm Booking'}
                  </button>
                </form>
              ) : !showBookingForm && isBookable && (
                <button
                  onClick={handleBookClick}
                  style={{
                    width: '100%',
                    padding: '20px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  ✈️ Book This Flight
                </button>
              )}

              {/* Not Bookable Message */}
              {!isBookable && (
                <div style={{
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
                  border: '2px solid rgba(239, 68, 68, 0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                    {flight.status === 'Cancelled' ? '✈️❌' : '🔒'}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#EF4444', marginBottom: '8px' }}>
                    {flight.status === 'Cancelled' ? 'Flight Cancelled' : 'Fully Booked'}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#64748B' }}>
                    {flight.status === 'Cancelled' 
                      ? 'This flight has been cancelled. Please choose another flight.'
                      : 'All seats have been booked for this flight. Please check other available flights.'}
                  </p>
                </div>
              )}
            </div>
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

      {/* Custom Styles */}
      <style>{`
        input::placeholder {
          color: #94A3B8;
        }
        
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%233B82F6' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 45px;
        }
      `}</style>
    </>
  );
};

export default FlightCard;