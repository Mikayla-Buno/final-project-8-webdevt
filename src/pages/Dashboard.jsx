import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { getUserBookings, flights } = useBooking();

  const userBookings = getUserBookings(user?.id).filter(b => b.status === 'confirmed');
  const upcomingFlights = flights
    .filter(flight => new Date(flight.date) >= new Date())
    .slice(0, 5);

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: `url('images/airplane.png')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
        
         {/* Welcome Banner */}
        <div className="p-8 mb-10 shadow-lg text-white bg-gradient-to-r from-[var(--blue-munsell)] to-[var(--charcoal)]">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>
            Welcome aboard, {user?.name || 'Traveler'}! 🛫
          </h1>
          <p className="text-lg" style={{ color: '#ffffff' }}>
            {userBookings.length > 0
              ? `You have ${userBookings.length} upcoming ${userBookings.length === 1 ? 'trip' : 'trips'} booked with Ohana Airlines.`
              : 'Ready to discover your next destination?'}
          </p>
        </div>

        <div className="container">
          {/* Statistics Overview */}
          <div className="stats-grid mb-10">
            <div className="stat-card hover:shadow-xl bg-gradient-to-br from-[var(--blue-munsell)] to-[var(--powder-blue)] text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="stat-value">{userBookings.length}</div>
                  <div className="stat-label">Upcoming Trips</div>
                </div>
                <div className="text-5xl opacity-20">
                  ✈️
                </div>
              </div>
            </div>

            <div className="stat-card hover:shadow-xl bg-gradient-to-br from-[var(--satin-gold)] to-[var(--pale-dogwood)] text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="stat-value">{upcomingFlights.length}</div>
                  <div className="stat-label">Available Flights</div>
                </div>
                <div className="text-5xl opacity-20">
                  🕓
                </div>
              </div>
            </div>

            <div className="stat-card hover:shadow-xl bg-gradient-to-br from-[var(--charcoal)] to-[var(--blue-munsell)] text-white">
              <div className="flex justify-between items-center">
                <div>
                  <div className="stat-value">
                    {userBookings.reduce((total, booking) => total + booking.passengers, 0)}
                  </div>
                  <div className="stat-label">Total Passengers</div>
                </div>
                <div className="text-5xl opacity-20">
                  👥
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Upcoming Trips Card */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#ffffff' }}>
                <span className="text-[var(--blue-munsell)]">🧳</span>
                Your Upcoming Trips
              </h2>
              
              {userBookings.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {userBookings.slice(0, 4).map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-[rgba(169,214,229,0.3)] rounded-xl p-4 hover:shadow-md transition-all duration-300 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-[var(--charcoal)]">
                          Flight #{booking.flightNumber}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {booking.origin} → {booking.destination}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(booking.date).toLocaleDateString()} — {booking.time}
                        </p>
                      </div>
                      <span className="booking-confirmed">Confirmed</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-8 text-gray-500">
                  <p className="mb-3">You don’t have any upcoming trips yet.</p>
                  <Link to="/flights" className="btn btn-primary">
                    Book a Flight
                  </Link>
                </div>
              )}
            </div>

            {/* Available Flights Card */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: '#ffffff' }}>
                <span className="text-[var(--satin-gold)]">🌍</span>
                Available Flights
              </h2>
              
              {upcomingFlights.length > 0 ? (
                <div className="card space-y-4 max-h-96 overflow-y-auto pr-1">
                  {upcomingFlights.map((flight) => (
                    <div
                      key={flight.id}
                      className="border border-[rgba(169,214,229,0.3)] rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-[var(--charcoal)]">
                            {flight.origin} → {flight.destination}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(flight.date).toLocaleDateString()} — {flight.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[var(--blue-munsell)]">
                            ₱{flight.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">per passenger</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-3">No available flights at the moment.</p>
                  <button className="btn btn-outline">Check Later</button>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
