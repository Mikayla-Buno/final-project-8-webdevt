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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2 font-elegant">
            Welcome back, {user?.name}! ✈️
          </h1>
          <p className="text-blue-100 text-lg font-base">
            {userBookings.length > 0 
              ? `You have ${userBookings.length} upcoming ${userBookings.length === 1 ? 'trip' : 'trips'}` 
              : "Ready to book your next adventure?"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-number">{userBookings.length}</div>
                <div className="stat-label text-blue-100">Upcoming Trips</div>
              </div>
              <div className="text-5xl opacity-30">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-number">{upcomingFlights.length}</div>
                <div className="stat-label text-green-100">Available Flights</div>
              </div>
              <div className="text-5xl opacity-30">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="stat-card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="stat-number">
                  {userBookings.reduce((total, booking) => total + booking.passengers, 0)}
                </div>
                <div className="stat-label text-yellow-100">Total Passengers</div>
              </div>
              <div className="text-5xl opacity-30">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upcoming Bookings */}
          <div className="card">
            <div className="card-header">
                              <h2 className="text-xl font-semibold text-gray-800 flex items-center font-elegant">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Your Upcoming Trips
              </h2>
            </div>
            <div className="card-body max-h-96 overflow-y-auto">
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200 hover:border-blue-300">
                      <div className="flex items-start space-x-4">
                        {booking.flight.image && (
                          <img
                            src={booking.flight.image}
                            alt="Flight"
                            className="w-20 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800 font-base">{booking.flight.flightNumber}</h3>
                              <p className="text-gray-600 text-sm font-base">
                                {booking.flight.origin} → {booking.flight.destination}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 font-base">
                                {booking.flight.date} | {booking.passengers} passenger(s)
                              </p>
                            </div>
                            <span className="booking-confirmed text-xs">Confirmed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎫</div>
                  <p className="text-gray-500 mb-4 font-base">No upcoming trips</p>
                  <Link to="/flights" className="elegant-button px-6 py-2 inline-block">
                    Book Your First Flight
                  </Link>
                </div>
              )}
            </div>
            {userBookings.length > 0 && (
              <div className="card-footer">
                <Link to="/bookings" className="btn btn-secondary w-full">
                  View All Bookings
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center font-elegant">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-3">
                <Link 
                  to="/flights" 
                  className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold font-base">Book a New Flight</p>
                    <p className="text-xs text-blue-100 font-base">Search and book your next trip</p>
                  </div>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link 
                  to="/bookings" 
                  className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold font-base">Manage Bookings</p>
                    <p className="text-xs text-purple-100 font-base">View and manage your reservations</p>
                  </div>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {user?.role === 'admin' && (
                  <>
                    <Link 
                      to="/admin/flights" 
                      className="flex items-center p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold font-base">Manage Flights</p>
                        <p className="text-xs text-yellow-100 font-base">Add, edit, or remove flights</p>
                      </div>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link 
                      to="/admin/reports" 
                      className="flex items-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold font-base">View Reports</p>
                        <p className="text-xs text-green-100 font-base">Analytics and insights</p>
                      </div>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Available Flights Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 font-elegant">Available Flights</h2>
            <Link to="/flights" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center font-base">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFlights.slice(0, 3).map(flight => (
              <div key={flight.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-40 overflow-hidden">
                  <img
                    src={flight.image}
                    alt={`${flight.origin} to ${flight.destination}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 font-base">{flight.flightNumber}</h3>
                      <p className="text-sm text-gray-600 font-base">{flight.origin} → {flight.destination}</p>
                    </div>
                    <span className={
                      flight.status === 'On Time' ? 'status-on-time' :
                      flight.status === 'Delayed' ? 'status-delayed' :
                      'status-cancelled'
                    }>
                      {flight.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 font-base">{flight.date} at {flight.departureTime}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600 font-elegant">₱{flight.price.toLocaleString()}</span>
                    <Link
                      to="/flights"
                      className="btn btn-primary text-sm py-2 px-4"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;