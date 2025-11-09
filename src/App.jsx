import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BookingProvider } from './contexts/BookingContext'
import { ToastProvider } from './contexts/ToastContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import FlightSearch from './pages/FlightSearch'
import Bookings from './pages/Bookings'
import AdminFlights from './pages/AdminFlights'
import AdminBookings from './pages/AdminBookings'
import AdminReports from './pages/AdminReports'

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/flights" element={
                    <ProtectedRoute>
                      <FlightSearch />
                    </ProtectedRoute>
                  } />
                  <Route path="/bookings" element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/flights" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminFlights />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/bookings" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminBookings />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/reports" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminReports />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App