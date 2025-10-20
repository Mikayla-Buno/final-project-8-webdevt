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
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-section">
          <div className="logo-icon">
            ✈️
          </div>
          <span className="logo-text">Ohana Airlines</span>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="nav-links">
            <Link
              to="/dashboard"
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/flights"
              className={`nav-link ${isActive('/flights') ? 'active' : ''}`}
            >
              Flights
            </Link>
            <Link
              to="/bookings"
              className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
            >
              My Bookings
            </Link>

            {user?.role === 'admin' && (
              <>
                <Link
                  to="/admin/flights"
                  className={`nav-link ${isActive('/admin/flights') ? 'active' : ''}`}
                >
                  Manage Flights
                </Link>
                <Link
                  to="/admin/bookings"
                  className={`nav-link ${isActive('/admin/bookings') ? 'active' : ''}`}
                >
                  All Bookings
                </Link>
                <Link
                  to="/admin/reports"
                  className={`nav-link ${isActive('/admin/reports') ? 'active' : ''}`}
                >
                  Reports
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Auth Section */}
        <div className="auth-buttons">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">
                {user?.name} {user?.role === 'admin' && '(Admin)'}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
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