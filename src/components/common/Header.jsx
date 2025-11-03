import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{ 
      background: '#3A3A3A', // Dark charcoal
      borderBottom: '1px solid #B8874B', // Gold accent
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1rem 2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #F4D06F 0%, #B8874B 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3A3A3A',
            fontSize: '1.25rem',
            boxShadow: '0 4px 12px rgba(184, 135, 75, 0.3)'
          }}>
            ✈️
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #F4D06F 0%, #B8874B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ohana Airlines
          </span>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link
              to="/dashboard"
              style={{
                color: isActive('/dashboard') ? '#F4D06F' : '#E2E8F0',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/flights"
              style={{
                color: isActive('/flights') ? '#F4D06F' : '#E2E8F0',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Flights
            </Link>
            <Link
              to="/bookings"
              style={{
                color: isActive('/bookings') ? '#F4D06F' : '#E2E8F0',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              My Bookings
            </Link>

            {user?.role === 'admin' && (
              <>
                <Link
                  to="/admin/flights"
                  style={{
                    color: isActive('/admin/flights') ? '#F4D06F' : '#E2E8F0',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Manage Flights
                </Link>
                <Link
                  to="/admin/bookings"
                  style={{
                    color: isActive('/admin/bookings') ? '#F4D06F' : '#E2E8F0',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  All Bookings
                </Link>
                <Link
                  to="/admin/reports"
                  style={{
                    color: isActive('/admin/reports') ? '#F4D06F' : '#E2E8F0',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Reports
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Auth Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                fontSize: '0.875rem',
                color: '#F4D06F',
                fontWeight: 600,
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                background: 'rgba(184, 135, 75, 0.1)'
              }}>
                {user?.name} {user?.role === 'admin' && '(Admin)'}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #F4D06F 0%, #B8874B 100%)',
                  color: '#3A3A3A'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: '1.5px solid #F4D06F',
                  color: '#F4D06F',
                  textDecoration: 'none'
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #F4D06F 0%, #B8874B 100%)',
                  color: '#3A3A3A',
                  textDecoration: 'none'
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
