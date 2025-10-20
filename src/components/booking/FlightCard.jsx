import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import ConfirmationModal from './ConfirmationModal';

const FlightCard = ({ flight, searchParams }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleCardClick = () => {
    setShowModal(true);
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

    setShowModal(false);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = (booking) => {
    setShowBookingForm(false);
    setConfirmedBooking(booking);
    setShowConfirmation(true);
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

  if (showBookingForm) {
    return (
      <BookingForm
        flight={flight}
        onCancel={() => setShowBookingForm(false)}
        onSuccess={handleBookingSuccess}
      />
    );
  }

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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Flight Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <img
                src={flight.image}
                alt={`${flight.origin} to ${flight.destination}`}
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.5rem' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                }}
              />

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

              {flight.description && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>About this flight</h4>
                  <p style={{ color: '#64748B', lineHeight: '1.6' }}>{flight.description}</p>
                </div>
              )}

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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', padding: '1rem', background: '#F8FAFC', borderRadius: '0.75rem' }}>
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
            </div>

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
          </div>
        </div>
      )}

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