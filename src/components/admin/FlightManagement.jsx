import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const FlightManagement = () => {
  const { user } = useAuth();
  const { flights, addFlight, updateFlight, deleteFlight } = useBooking();
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    price: '',
    seatCapacity: '',
    date: '',
    aircraft: '',
    status: 'On Time',
    image: '',
    description: '',
    amenities: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process amenities from comma-separated string to array
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      seatCapacity: parseInt(formData.seatCapacity),
      amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : []
    };
    
    if (editingFlight) {
      const result = updateFlight(editingFlight.id, processedData, user?.role);
      if (result.success) {
        alert('Flight updated successfully!');
      } else {
        alert('Error: ' + result.error);
        return;
      }
    } else {
      const result = addFlight(processedData, user?.role);
      if (result.success) {
        alert('Flight added successfully!');
      } else {
        alert('Error: ' + result.error);
        return;
      }
    }
    
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingFlight(null);
    setFormData({
      flightNumber: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      duration: '',
      price: '',
      seatCapacity: '',
      date: '',
      aircraft: '',
      status: 'On Time',
      image: '',
      description: '',
      amenities: ''
    });
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormData({
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration,
      price: flight.price,
      seatCapacity: flight.seatCapacity,
      date: flight.date,
      aircraft: flight.aircraft,
      status: flight.status,
      image: flight.image || '',
      description: flight.description || '',
      amenities: flight.amenities ? flight.amenities.join(', ') : ''
    });
    setShowForm(true);
  };

  const handleDelete = (flightId) => {
    if (window.confirm('Are you sure you want to delete this flight? This action cannot be undone.')) {
      const result = deleteFlight(flightId, user?.role);
      if (result.success) {
        alert('Flight deleted successfully!');
        window.location.reload();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'On Time': return 'status-on-time';
      case 'Delayed': return 'status-delayed';
      case 'Cancelled': return 'status-cancelled';
      case 'Fully Booked': return 'bg-gray-100 text-gray-800';
      default: return 'status-on-time';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Flight Management</h1>
          <p className="text-gray-600 mt-1">Add, edit, and manage all flights</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Flight
        </button>
      </div>

      {/* Flight Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="stat-number">{flights.length}</div>
          <div className="stat-label text-blue-100">Total Flights</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="stat-number">
            {flights.filter(f => f.status === 'On Time').length}
          </div>
          <div className="stat-label text-green-100">On Time</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="stat-number">
            {flights.filter(f => f.status === 'Delayed').length}
          </div>
          <div className="stat-label text-yellow-100">Delayed</div>
        </div>
        <div className="stat-card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="stat-number">
            {flights.filter(f => f.availableSeats === 0).length}
          </div>
          <div className="stat-label text-red-100">Fully Booked</div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-slide-in">
          <h2 className="text-xl font-bold mb-4">
            {editingFlight ? 'Edit Flight' : 'Add New Flight'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Flight Number *</label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., OH101"
                  required
                />
              </div>
              <div>
                <label className="form-label">Aircraft *</label>
                <input
                  type="text"
                  name="aircraft"
                  value={formData.aircraft}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Boeing 737"
                  required
                />
              </div>
              <div>
                <label className="form-label">Origin *</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Manila (MNL)"
                  required
                />
              </div>
              <div>
                <label className="form-label">Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Cebu (CEB)"
                  required
                />
              </div>
              <div>
                <label className="form-label">Departure Time *</label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Arrival Time *</label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 1h 30m"
                  required
                />
              </div>
              <div>
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Price (₱) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 2500"
                  required
                />
              </div>
              <div>
                <label className="form-label">Seat Capacity *</label>
                <input
                  type="number"
                  name="seatCapacity"
                  value={formData.seatCapacity}
                  onChange={handleInputChange}
                  className="form-input"
                  min="1"
                  placeholder="e.g., 180"
                  required
                />
              </div>
              <div>
                <label className="form-label">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="2"
                  placeholder="Brief description of the flight..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label">Amenities (comma-separated)</label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Wi-Fi, Meals, Entertainment, Extra legroom"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button type="submit" className="btn btn-primary">
                {editingFlight ? 'Update Flight' : 'Add Flight'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Flights List */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="md:flex">
              {/* Flight Image */}
              <div className="md:w-1/4 h-48 md:h-auto">
                <img
                  src={flight.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'}
                  alt={`${flight.origin} to ${flight.destination}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                  }}
                />
              </div>

              {/* Flight Details */}
              <div className="md:w-3/4 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{flight.flightNumber}</h3>
                    <p className="text-sm text-gray-600">{flight.aircraft}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={getStatusClass(flight.status)}>
                      {flight.status}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      ₱{flight.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Route</p>
                    <p className="font-semibold">{flight.origin} → {flight.destination}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Schedule</p>
                    <p className="font-semibold">{flight.date}</p>
                    <p className="text-sm text-gray-600">{flight.departureTime} - {flight.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Seat Availability</p>
                    <p className="font-semibold">{flight.availableSeats} / {flight.seatCapacity}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          flight.availableSeats === 0 ? 'bg-red-500' :
                          flight.availableSeats < flight.seatCapacity * 0.3 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{
                          width: `${(flight.availableSeats / flight.seatCapacity) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {flight.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{flight.description}</p>
                )}

                {flight.amenities && flight.amenities.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {flight.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(flight)}
                    className="btn btn-warning text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight.id)}
                    className="btn btn-danger text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightManagement;