import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';

const Reports = () => {
  const { user } = useAuth();
  const { getAllBookings, flights } = useBooking();
  const [reportType, setReportType] = useState('revenue');

  const allBookings = getAllBookings(user?.role);
  const confirmedBookings = allBookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = allBookings.filter(b => b.status === 'cancelled');

  // Revenue Report
  const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const averageBookingValue = confirmedBookings.length > 0 ? totalRevenue / confirmedBookings.length : 0;
  const totalCancelled = cancelledBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  // Flight Performance
  const flightPerformance = flights.map(flight => {
    const flightBookings = allBookings.filter(b => b.flightId === flight.id && b.status === 'confirmed');
    const revenue = flightBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const bookedSeats = flight.seatCapacity - flight.availableSeats;
    const occupancyRate = (bookedSeats / flight.seatCapacity) * 100;
    
    return {
      ...flight,
      bookings: flightBookings.length,
      revenue,
      bookedSeats,
      occupancyRate
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Passenger Statistics
  const totalPassengers = confirmedBookings.reduce((sum, booking) => sum + booking.passengers, 0);
  const averagePassengersPerBooking = confirmedBookings.length > 0 ? totalPassengers / confirmedBookings.length : 0;

  // Route Analysis
  const routeStats = {};
  confirmedBookings.forEach(booking => {
    const route = `${booking.flight.origin} → ${booking.flight.destination}`;
    if (!routeStats[route]) {
      routeStats[route] = { count: 0, revenue: 0, passengers: 0 };
    }
    routeStats[route].count++;
    routeStats[route].revenue += booking.totalPrice;
    routeStats[route].passengers += booking.passengers;
  });

  const topRoutes = Object.entries(routeStats)
    .map(([route, stats]) => ({ route, ...stats }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const generateCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (reportType === 'revenue') {
      csvContent += "Date,Booking Reference,Flight,Route,Passengers,Amount,Status\n";
      confirmedBookings.forEach(booking => {
        csvContent += `${booking.bookingDate},${booking.bookingReference},${booking.flight.flightNumber},"${booking.flight.origin} - ${booking.flight.destination}",${booking.passengers},${booking.totalPrice},${booking.status}\n`;
      });
    } else if (reportType === 'flights') {
      csvContent += "Flight Number,Route,Date,Capacity,Booked,Available,Occupancy Rate,Revenue,Status\n";
      flightPerformance.forEach(flight => {
        csvContent += `${flight.flightNumber},"${flight.origin} - ${flight.destination}",${flight.date},${flight.seatCapacity},${flight.bookedSeats},${flight.availableSeats},${flight.occupancyRate.toFixed(1)}%,${flight.revenue},${flight.status}\n`;
      });
    } else if (reportType === 'passengers') {
      csvContent += "Passenger Count,Number of Bookings,Percentage\n";
      [1,2,3,4,5,6].forEach(passengerCount => {
        const count = confirmedBookings.filter(b => b.passengers === passengerCount).length;
        const percentage = confirmedBookings.length > 0 ? (count / confirmedBookings.length) * 100 : 0;
        csvContent += `${passengerCount},${count},${percentage.toFixed(1)}%\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ohana_${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'On Time': return 'status-on-time';
      case 'Delayed': return 'status-delayed';
      case 'Cancelled': return 'status-cancelled';
      default: return 'status-on-time';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your airline operations</p>
        </div>
        <button
          onClick={generateCSV}
          className="btn btn-success flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Report Type Selector */}
      <div className="card p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setReportType('revenue')}
            className={`btn ${reportType === 'revenue' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Revenue Report
          </button>
          <button
            onClick={() => setReportType('flights')}
            className={`btn ${reportType === 'flights' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Flight Performance
          </button>
          <button
            onClick={() => setReportType('passengers')}
            className={`btn ${reportType === 'passengers' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Passenger Statistics
          </button>
          <button
            onClick={() => setReportType('routes')}
            className={`btn ${reportType === 'routes' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Route Analysis
          </button>
        </div>
      </div>

      {/* Revenue Report */}
      {reportType === 'revenue' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="stat-number">₱{totalRevenue.toLocaleString()}</div>
              <div className="stat-label text-green-100">Total Revenue</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="stat-number">{confirmedBookings.length}</div>
              <div className="stat-label text-blue-100">Confirmed Bookings</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="stat-number">₱{averageBookingValue.toFixed(0).toLocaleString()}</div>
              <div className="stat-label text-purple-100">Avg Booking Value</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="stat-number">₱{totalCancelled.toLocaleString()}</div>
              <div className="stat-label text-red-100">Lost Revenue</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="table-header">Booking Ref</th>
                    <th className="table-header">Flight</th>
                    <th className="table-header">Route</th>
                    <th className="table-header">Passengers</th>
                    <th className="table-header">Amount</th>
                    <th className="table-header">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedBookings.slice(0, 10).map(booking => (
                    <tr key={booking.id} className="table-row">
                      <td className="table-cell font-mono text-sm">{booking.bookingReference}</td>
                      <td className="table-cell font-semibold">{booking.flight.flightNumber}</td>
                      <td className="table-cell text-sm">{booking.flight.origin} → {booking.flight.destination}</td>
                      <td className="table-cell">{booking.passengers}</td>
                      <td className="table-cell text-green-600 font-semibold">
                        ₱{booking.totalPrice.toLocaleString()}
                      </td>
                      <td className="table-cell text-sm">{booking.bookingDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Flight Performance */}
      {reportType === 'flights' && (
        <div className="space-y-6 animate-fade-in">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Flight Performance Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="table-header">Flight</th>
                    <th className="table-header">Route</th>
                    <th className="table-header">Date</th>
                    <th className="table-header">Capacity</th>
                    <th className="table-header">Booked</th>
                    <th className="table-header">Occupancy</th>
                    <th className="table-header">Revenue</th>
                    <th className="table-header">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {flightPerformance.map(flight => (
                    <tr key={flight.id} className="table-row">
                      <td className="table-cell font-semibold">{flight.flightNumber}</td>
                      <td className="table-cell text-sm">
                        {flight.origin} → {flight.destination}
                      </td>
                      <td className="table-cell text-sm">{flight.date}</td>
                      <td className="table-cell">{flight.seatCapacity}</td>
                      <td className="table-cell">{flight.bookedSeats}</td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{flight.occupancyRate.toFixed(1)}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                flight.occupancyRate >= 80 ? 'bg-green-500' :
                                flight.occupancyRate >= 50 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${flight.occupancyRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell text-green-600 font-semibold">
                        ₱{flight.revenue.toLocaleString()}
                      </td>
                      <td className="table-cell">
                        <span className={getStatusClass(flight.status)}>
                          {flight.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Passenger Statistics */}
      {reportType === 'passengers' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="stat-number">{totalPassengers}</div>
              <div className="stat-label text-blue-100">Total Passengers</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="stat-number">{averagePassengersPerBooking.toFixed(1)}</div>
              <div className="stat-label text-purple-100">Avg Passengers/Booking</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-red-500 to-red-600 text-white">
              <div className="stat-number">{cancelledBookings.length}</div>
              <div className="stat-label text-red-100">Cancelled Bookings</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Booking Distribution by Passenger Count</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map(passengerCount => {
                  const count = confirmedBookings.filter(b => b.passengers === passengerCount).length;
                  const percentage = confirmedBookings.length > 0 ? (count / confirmedBookings.length) * 100 : 0;
                  
                  return (
                    <div key={passengerCount} className="flex items-center">
                      <span className="w-32 text-sm font-medium">
                        {passengerCount} {passengerCount === 1 ? 'Passenger' : 'Passengers'}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage > 10 && (
                              <span className="text-xs text-white font-semibold">
                                {percentage.toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="w-24 text-right text-sm font-semibold">{count} bookings</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Route Analysis */}
      {reportType === 'routes' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
              <div className="stat-number">{Object.keys(routeStats).length}</div>
              <div className="stat-label text-indigo-100">Active Routes</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="stat-number">
                {topRoutes.length > 0 ? topRoutes[0].count : 0}
              </div>
              <div className="stat-label text-green-100">Most Popular Route</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <div className="stat-number">
                ₱{topRoutes.length > 0 ? topRoutes[0].revenue.toLocaleString() : 0}
              </div>
              <div className="stat-label text-purple-100">Top Route Revenue</div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Top 5 Routes by Revenue</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topRoutes.map((route, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{route.route}</p>
                          <p className="text-sm text-gray-500">
                            {route.count} bookings • {route.passengers} passengers
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          ₱{route.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₱{Math.round(route.revenue / route.passengers).toLocaleString()} per passenger
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{
                          width: `${(route.revenue / topRoutes[0].revenue) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">All Routes Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="table-header">Route</th>
                    <th className="table-header">Bookings</th>
                    <th className="table-header">Passengers</th>
                    <th className="table-header">Revenue</th>
                    <th className="table-header">Avg per Passenger</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(routeStats)
                    .map(([route, stats]) => ({ route, ...stats }))
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((route, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell font-semibold">{route.route}</td>
                        <td className="table-cell">{route.count}</td>
                        <td className="table-cell">{route.passengers}</td>
                        <td className="table-cell text-green-600 font-semibold">
                          ₱{route.revenue.toLocaleString()}
                        </td>
                        <td className="table-cell">
                          ₱{Math.round(route.revenue / route.passengers).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;