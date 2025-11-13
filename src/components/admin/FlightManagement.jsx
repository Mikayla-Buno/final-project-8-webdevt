import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const FlightManagement = () => {
  const { user } = useAuth();
  const { flights, addFlight, updateFlight, deleteFlight } = useBooking();
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      flightNumber: '', origin: '', destination: '', departureTime: '',
      arrivalTime: '', duration: '', price: '', seatCapacity: '',
      date: '', aircraft: '', status: 'On Time', image: '', description: '', amenities: ''
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

  const filteredFlights = flights.filter(flight => {
    const matchesFilter = filter === 'all' || flight.status === filter;
    const matchesSearch = searchTerm === '' ||
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'On Time': return { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', shadow: 'rgba(16, 185, 129, 0.4)' };
      case 'Delayed': return { bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', shadow: 'rgba(245, 158, 11, 0.4)' };
      case 'Cancelled': return { bg: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', shadow: 'rgba(239, 68, 68, 0.4)' };
      default: return { bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', shadow: 'rgba(16, 185, 129, 0.4)' };
    }
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
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
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
            Flight Management
          </h1>
          <p style={{ fontSize: '18px', color: '#ffffff', fontWeight: '500', textShadow: '0 1px 8px rgba(0, 0, 0, 0.2)' }}>
            Add, edit, and manage all flights
          </p>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <StatCard number={flights.length} label="Total Flights" gradient="linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)" delay="0s" />
          <StatCard number={flights.filter(f => f.status === 'On Time').length} label="On Time" gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)" delay="0.1s" />
          <StatCard number={flights.filter(f => f.status === 'Delayed').length} label="Delayed" gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" delay="0.2s" />
          <StatCard number={flights.filter(f => f.availableSeats === 0).length} label="Fully Booked" gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)" delay="0.3s" />
        </div>

        {/* Action Bar */}
        <div style={{
          marginBottom: '32px',
          borderRadius: '20px',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          animation: 'fadeSlideUp 0.8s ease-out'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Filter Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} count={flights.length}>
                All
              </FilterButton>
              <FilterButton active={filter === 'On Time'} onClick={() => setFilter('On Time')} count={flights.filter(f => f.status === 'On Time').length}>
                On Time
              </FilterButton>
              <FilterButton active={filter === 'Delayed'} onClick={() => setFilter('Delayed')} count={flights.filter(f => f.status === 'Delayed').length}>
                Delayed
              </FilterButton>
              <FilterButton active={filter === 'Cancelled'} onClick={() => setFilter('Cancelled')} count={flights.filter(f => f.status === 'Cancelled').length}>
                Cancelled
              </FilterButton>
            </div>

            {/* Search & Add Button */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search flights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '14px',
                  minWidth: '200px',
                  outline: 'none',
                  fontWeight: '500'
                }}
              />
              <button
                onClick={() => setShowForm(!showForm)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
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
                <span style={{ fontSize: '18px' }}>✈️</span>
                {showForm ? 'Hide Form' : 'Add New Flight'}
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{
            borderRadius: '24px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px',
            animation: 'fadeSlideUp 0.5s ease-out'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '24px', textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
              {editingFlight ? '✏️ Edit Flight' : '➕ Add New Flight'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <FormField label="Flight Number" name="flightNumber" value={formData.flightNumber} onChange={handleInputChange} required placeholder="e.g., OH101" />
                <FormField label="Aircraft" name="aircraft" value={formData.aircraft} onChange={handleInputChange} required placeholder="e.g., Boeing 737" />
                <FormField label="Origin" name="origin" value={formData.origin} onChange={handleInputChange} required placeholder="e.g., Manila (MNL)" />
                <FormField label="Destination" name="destination" value={formData.destination} onChange={handleInputChange} required placeholder="e.g., Cebu (CEB)" />
                <FormField label="Departure Time" name="departureTime" type="time" value={formData.departureTime} onChange={handleInputChange} required />
                <FormField label="Arrival Time" name="arrivalTime" type="time" value={formData.arrivalTime} onChange={handleInputChange} required />
                <FormField label="Duration" name="duration" value={formData.duration} onChange={handleInputChange} required placeholder="e.g., 1h 30m" />
                <FormField label="Date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
                <FormField label="Price (₱)" name="price" type="number" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" placeholder="e.g., 2500" />
                <FormField label="Seat Capacity" name="seatCapacity" type="number" value={formData.seatCapacity} onChange={handleInputChange} required min="1" placeholder="e.g., 180" />
                <FormField label="Status" name="status" value={formData.status} onChange={handleInputChange} select options={['On Time', 'Delayed', 'Cancelled']} />
                <FormField label="Image URL" name="image" type="url" value={formData.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
              </div>
              <div style={{ marginTop: '20px' }}>
                <FormField label="Description" name="description" value={formData.description} onChange={handleInputChange} textarea rows="2" placeholder="Brief description of the flight..." />
              </div>
              <div style={{ marginTop: '20px' }}>
                <FormField label="Amenities (comma-separated)" name="amenities" value={formData.amenities} onChange={handleInputChange} placeholder="e.g., Wi-Fi, Meals, Entertainment, Extra legroom" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                <button type="submit" style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s',
                  fontSize: '15px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                }}>
                  {editingFlight ? 'Update Flight' : 'Add Flight'}
                </button>
                <button type="button" onClick={resetForm} style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ffffff',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '15px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Flights Grid */}
        {filteredFlights.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
            animation: 'fadeSlideUp 0.9s ease-out',
            justifyItems: 'center'
          }}>
            {filteredFlights.map((flight, index) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getStatusClass={getStatusClass}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} searchTerm={searchTerm} />
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

// Stat Card Component
const StatCard = ({ number, label, gradient, delay }) => {
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
        boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeSlideUp 0.7s ease-out ${delay}`
      }}
    >
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '12px',
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {number}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
        {label}
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ active, onClick, count, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '12px 20px',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.3s',
        background: active
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
          : isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        border: `2px solid ${active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'}`,
        boxShadow: active ? '0 8px 20px rgba(255,107,53,0.4)' : isHovered ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none',
        transform: isHovered || active ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
      }}
    >
      <span>{children}</span>
      <span style={{
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        background: active ? 'rgba(255,255,255,0.25)' : 'rgba(255, 255, 255, 0.2)',
        color: 'white'
      }}>
        {count}
      </span>
    </button>
  );
};

// Form Field Component
const FormField = ({ label, name, value, onChange, type = 'text', required, placeholder, select, options, textarea, rows, min, step }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#ffffff', fontSize: '14px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
      {label} {required && <span style={{ color: '#FCA5A5' }}>*</span>}
    </label>
    {select ? (
      <select name={name} value={value} onChange={onChange} required={required} style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        fontWeight: '500',
        cursor: 'pointer'
      }}>
        {options.map(opt => <option key={opt} value={opt} style={{ background: '#1F2937', color: '#ffffff' }}>{opt}</option>)}
      </select>
    ) : textarea ? (
      <textarea name={name} value={value} onChange={onChange} rows={rows} placeholder={placeholder} style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        fontWeight: '500',
        fontFamily: 'inherit'
      }} />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} min={min} step={step} style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
        fontWeight: '500'
      }} />
    )}
  </div>
);

// Detail Item Component
const DetailItem = ({ label, value }) => (
  <div style={{
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.25)'
  }}>
    <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500', textTransform: 'uppercase', display: 'block', marginBottom: '4px', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
      {label}
    </span>
    <p style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
      {value}
    </p>
  </div>
);

// Flight Card Component
const FlightCard = ({ flight, index, onEdit, onDelete, getStatusClass }) => {
  const [isHovered, setIsHovered] = useState(false);
  const statusStyle = getStatusClass(flight.status);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        animation: `fadeSlideUp 0.5s ease-out ${index * 0.08}s backwards`,
        width: '100%',
        maxWidth: '380px'
      }}
    >
      {/* Flight Image */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '85%', overflow: 'hidden' }}>
        <img
          src={flight.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80'}
          alt={flight.flightNumber}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
        }} />
        
        {/* Status Badge */}
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          padding: '8px 16px',
          borderRadius: '20px',
          background: statusStyle.bg,
          color: 'white',
          fontWeight: '600',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: `0 4px 12px ${statusStyle.shadow}`
        }}>
          {flight.status}
        </div>

        {/* Flight Number */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '20px',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px 0', textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
            {flight.flightNumber}
          </h2>
          <p style={{ fontSize: '13px', opacity: 0.9, margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.5)' }}>
            {flight.aircraft}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
        
        {/* Route */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>✈️</div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
              {flight.origin}
            </p>
          </div>
          
          <div style={{
            width: '40px',
            height: '2px',
            background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              right: '-4px',
              top: '-3px',
              width: '8px',
              height: '8px',
              background: '#F7931E',
              borderRadius: '50%'
            }} />
          </div>
          
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>🛬</div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
              {flight.destination}
            </p>
          </div>
        </div>

        {/* Flight Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <DetailItem label="Date" value={new Date(flight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
          <DetailItem label="Depart" value={flight.departureTime} />
          <DetailItem label="Duration" value={flight.duration} />
          <DetailItem label="Arrive" value={flight.arrivalTime} />
        </div>

        {/* Seat Info */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500' }}>Seat Availability</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>
              {flight.availableSeats} / {flight.seatCapacity}
            </span>
          </div>
          <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: '10px',
                background: flight.availableSeats === 0 
                  ? 'linear-gradient(90deg, #EF4444, #DC2626)' 
                  : flight.availableSeats < flight.seatCapacity * 0.3 
                    ? 'linear-gradient(90deg, #F59E0B, #D97706)' 
                    : 'linear-gradient(90deg, #10B981, #059669)',
                width: `${(flight.availableSeats / flight.seatCapacity) * 100}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Price */}
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          borderRadius: '12px',
          marginBottom: '16px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)'
        }}>
          <p style={{ fontSize: '12px', opacity: 0.9, margin: '0 0 4px 0' }}>Price per passenger</p>
          <p style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>₱{flight.price.toLocaleString()}</p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(flight);
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(flight.id);
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ filter, searchTerm }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        {searchTerm ? "No flights found" : filter === 'all' ? "No flights available" : `No ${filter.toLowerCase()} flights`}
      </h3>
      <p style={{
        color: '#ffffff',
        fontSize: '16px',
        marginBottom: '32px',
        maxWidth: '400px',
        margin: '0 auto 32px',
        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
      }}>
        {searchTerm 
          ? `No flights match your search "${searchTerm}". Try adjusting your search criteria.`
          : filter === 'all'
            ? "Get started by adding your first flight to the system."
            : `There are currently no ${filter.toLowerCase()} flights in the system.`}
      </p>
    </div>
  );
};

export default FlightManagement;