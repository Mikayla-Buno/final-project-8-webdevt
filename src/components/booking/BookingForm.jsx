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
    <div className="card p-6" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h3 className="text-2xl font-bold mb-6 font-elegant" style={{ 
        background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--satin-gold) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Book Flight {flight.flightNumber}
      </h3>
     
      <div className="mb-6 p-4 rounded-lg" style={{ 
        background: 'linear-gradient(135deg, rgba(169, 214, 229, 0.2), rgba(232, 196, 196, 0.2))',
        border: '2px solid var(--powder-blue)'
      }}>
        <p className="font-base" style={{ marginBottom: '0.5rem' }}>
          <strong style={{ color: 'var(--charcoal)' }}>Route:</strong> {flight.origin} → {flight.destination}
        </p>
        <p className="font-base" style={{ marginBottom: '0.5rem' }}>
          <strong style={{ color: 'var(--charcoal)' }}>Date:</strong> {flight.date} | <strong>Time:</strong> {flight.departureTime} - {flight.arrivalTime}
        </p>
        <p className="font-base">
          <strong style={{ color: 'var(--charcoal)' }}>Duration:</strong> {flight.duration} | <strong>Aircraft:</strong> {flight.aircraft}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Number of Passengers</label>
          <select
            value={passengers}
            onChange={(e) => handlePassengerCountChange(parseInt(e.target.value))}
            className="form-select"
          >
            {[1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-lg font-elegant" style={{ color: 'var(--charcoal)' }}>
            Passenger Details
          </h4>
          {passengerDetails.map((passenger, index) => (
            <div key={index} className="card p-4" style={{ 
              background: 'rgba(248, 250, 252, 0.8)',
              border: '1px solid var(--powder-blue)'
            }}>
              <h5 className="font-medium mb-3 font-base" style={{ color: 'var(--blue-munsell)' }}>
                Passenger {index + 1}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    className="form-input"
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg mb-6" style={{ 
          background: 'linear-gradient(135deg, rgba(42, 157, 143, 0.1), rgba(205, 165, 91, 0.1))',
          border: '2px solid var(--blue-munsell)'
        }}>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold font-base" style={{ color: 'var(--charcoal)' }}>
              Total Price:
            </span>
            <span className="text-3xl font-bold font-elegant" style={{ 
              background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--satin-gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ₱{totalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-sm mt-1 font-base" style={{ color: 'var(--charcoal)', opacity: 0.7 }}>
            {passengers} passenger(s) × ₱{flight.price.toLocaleString()}
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary flex-1"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;