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

  // Gradient styles
  const gradients = {
    ohana: 'linear-gradient(135deg, #2A9D8F 0%, #446775 50%, #CDA55B 100%)',
    light: 'linear-gradient(135deg, rgba(42, 157, 143, 0.6) 0%, rgba(68, 103, 117, 0.6) 50%, rgba(205, 165, 91, 0.6) 100%)'

  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(169, 214, 229, 0.05) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(42, 157, 143, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(42, 157, 143, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Logo Section */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '48px',
            height: '48px',
            background: gradients.ohana,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            boxShadow: '0 6px 20px rgba(42, 157, 143, 0.4)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            ✈️
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            background: gradients.ohana,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em'
          }}>
            Ohana Airlines
          </span>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
              Dashboard
            </NavLink>
            <NavLink to="/flights" isActive={isActive('/flights')}>
              Flights
            </NavLink>
            <NavLink to="/bookings" isActive={isActive('/bookings')}>
              My Bookings
            </NavLink>

            {user?.role === 'admin' && (
              <>
                <NavLink to="/admin/flights" isActive={isActive('/admin/flights')}>
                  Manage Flights
                </NavLink>
                <NavLink to="/admin/bookings" isActive={isActive('/admin/bookings')}>
                  All Bookings
                </NavLink>
                <NavLink to="/admin/reports" isActive={isActive('/admin/reports')}>
                  Reports
                </NavLink>
              </>
            )}
          </nav>
        )}

        {/* Auth Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {isAuthenticated ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#446775',
                fontWeight: 600,
                background: 'linear-gradient(135deg, rgba(169, 214, 229, 0.3) 0%, rgba(232, 196, 196, 0.3) 100%)',
                padding: '0.625rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid rgba(42, 157, 143, 0.2)',
                boxShadow: '0 2px 8px rgba(42, 157, 143, 0.1)'
              }}>
                <span style={{
                  background: gradients.ohana,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {user?.name}
                </span>
                {user?.role === 'admin' && (
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    background: 'linear-gradient(135deg, #CDA55B 0%, #2A9D8F 100%)',
                    color: 'white',
                    borderRadius: '6px',
                    fontWeight: 700
                  }}>
                    ADMIN
                  </span>
                )}
              </div>
              <GradientButton gradient={gradients.ohana} onClick={handleLogout}>
                Logout
              </GradientButton>
            </div>
          ) : (
            <>
              {/* Login = Light Ohana gradient */}
              <GradientButton gradient={gradients.light} to="/login">
                Login
              </GradientButton>

              {/* Sign Up = Regular Ohana gradient */}
              <GradientButton gradient={gradients.ohana} to="/register">
                Sign Up
              </GradientButton>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </header>
  );
};

// Navigation Link Component
const NavLink = ({ to, isActive, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        color: isActive ? '#2A9D8F' : '#446775',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.9375rem',
        padding: '0.625rem 1rem',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
        background: isActive 
          ? 'linear-gradient(135deg, rgba(42, 157, 143, 0.15) 0%, rgba(205, 165, 91, 0.15) 100%)'
          : isHovered 
            ? 'rgba(169, 214, 229, 0.1)' 
            : 'transparent',
        border: isActive 
          ? '1px solid rgba(42, 157, 143, 0.3)' 
          : '1px solid transparent',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isActive 
          ? '0 4px 12px rgba(42, 157, 143, 0.2)' 
          : isHovered 
            ? '0 2px 8px rgba(42, 157, 143, 0.15)' 
            : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

// Reusable Gradient Button Component
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
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: gradient,
        color: 'white',
        boxShadow: isHovered 
          ? '0 8px 24px rgba(42, 157, 143, 0.5)' 
          : '0 4px 16px rgba(42, 157, 143, 0.3)',
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.) 0%, transparent 100%)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }} />
    </Component>
  );
};

export default Header;
