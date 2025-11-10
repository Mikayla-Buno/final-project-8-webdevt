import React, { useState } from 'react';
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

  const gradients = {
    sunset: 'linear-gradient(135deg, #FF6B35 0%, #FF9E4F 50%, #FFD580 100%)',
  };

  return (
    <header
      style={{
        background: '#1C1C1C',
        color: '#FF9E4F',
        fontFamily: '"Roboto", sans-serif',
        borderBottom: '1px solid rgba(255, 158, 79, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'float 3s ease-in-out infinite'
            }}
          >
            <img
              src="/images/lobob.png"
              alt="Ohana Airlines Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '12px'
              }}
            />
          </div>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: gradients.sunset,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            Ohana Airlines
          </span>
        </Link>

        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <NavLink to="/dashboard" isActive={isActive('/dashboard')}>Dashboard</NavLink>
            <NavLink to="/flights" isActive={isActive('/flights')}>Flights</NavLink>
            <NavLink to="/bookings" isActive={isActive('/bookings')}>My Bookings</NavLink>

            {user?.role === 'admin' && (
              <>
                <NavLink to="/admin/flights" isActive={isActive('/admin/flights')}>Manage Flights</NavLink>
                <NavLink to="/admin/bookings" isActive={isActive('/admin/bookings')}>All Bookings</NavLink>
                <NavLink to="/admin/reports" isActive={isActive('/admin/reports')}>Reports</NavLink>
              </>
            )}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

              {/* ✅ USERNAME IS NOW CLICKABLE */}
              <Link
                to="/profile"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: 'rgba(255, 158, 79, 0.1)',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 158, 79, 0.3)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  color: '#FFB347',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                {user?.name}
                {user?.role === 'admin' && (
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      background: 'linear-gradient(135deg, #FF6B35 0%, #FF9E4F 100%)',
                      color: 'white',
                      borderRadius: '6px',
                      fontWeight: 700
                    }}
                  >
                    ADMIN
                  </span>
                )}
              </Link>

              <GradientButton gradient={gradients.sunset} onClick={handleLogout}>
                Logout
              </GradientButton>
            </div>
          ) : (
            <>
              <GradientButton gradient={gradients.dark} to="/login">
                Login
              </GradientButton>
              <GradientButton gradient={gradients.sunset} to="/register">
                Sign Up
              </GradientButton>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </header>
  );
};

const NavLink = ({ to, isActive, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        color: isActive ? '#FFB347' : '#FF9E4F',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.9375rem',
        padding: '0.625rem 1rem',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
        background: isActive
          ? 'rgba(255, 107, 53, 0.15)'
          : isHovered
          ? 'rgba(255, 158, 79, 0.1)'
          : 'transparent',
        border: isActive ? '1px solid rgba(255, 158, 79, 0.3)' : '1px solid transparent',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isActive
          ? '0 4px 12px rgba(255, 107, 53, 0.2)'
          : isHovered
          ? '0 2px 8px rgba(255, 158, 79, 0.15)'
          : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

const GradientButton = ({ onClick, to, children, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Component = to ? Link : 'button';
  return (
    <Component
      to={to}
      onClick={onClick}
      style={{
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize: '0.9375rem',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        background: gradient,
        color: '#1C1C1C',
        transition: 'all 0.3s ease',
        boxShadow: isHovered
          ? '0 8px 24px rgba(255, 107, 53, 0.5)'
          : '0 4px 16px rgba(255, 158, 79, 0.3)',
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.) 0%, transparent 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </Component>
  );
};

export default Header;