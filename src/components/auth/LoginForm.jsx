import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    
    // Clear validation error for this field
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleBlur = (field) => {
    setFocusedField(null);
    
    // Validate on blur
    const errors = {};
    if (field === 'email' && formData.email && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (field === 'password' && formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors({ ...validationErrors, ...errors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Final validation before submit
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = (fieldName) => ({
    padding: '0.875rem 1rem',
    paddingRight: fieldName === 'password' ? '3rem' : '1rem',
    borderRadius: '12px',
    border: validationErrors[fieldName] 
      ? '2px solid #EF4444' 
      : focusedField === fieldName 
        ? '2px solid #FF9E4F'
        : '1px solid rgba(255,255,255,0.3)',
    fontSize: '0.9375rem',
    outline: 'none',
    background: focusedField === fieldName 
      ? 'rgba(255,255,255,0.12)' 
      : 'rgba(255,255,255,0.08)',
    color: '#F9FAFB',
    transition: 'all 0.3s ease',
    boxShadow: focusedField === fieldName 
      ? '0 0 0 4px rgba(255, 158, 79, 0.1)' 
      : validationErrors[fieldName]
        ? '0 0 0 4px rgba(239, 68, 68, 0.1)'
        : 'none',
    width: '100%'
  });

  return (
    <div style={{
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(28, 28, 28, 0.85)',
      backdropFilter: 'blur(16px)',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2,
      boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 1px rgba(255, 158, 79, 0.2)',
      border: '1px solid rgba(255, 158, 79, 0.1)',
      fontFamily: '"Roboto", sans-serif'
    }}>
      {/* Logo and Welcome */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src="/images/lobob.png"
          alt="Ohana Airlines Logo"
          style={{
            width: '120px',
            height: '96px',
            margin: '0 auto',
            borderRadius: '16px',
            objectFit: 'contain',
            marginBottom: '1rem'
          }}
        />
        <h1 style={{ 
          fontSize: '1.875rem', 
          fontWeight: 800, 
          color: '#FFFFFF', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF9E4F 50%, #FFD580 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome Back
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#D1D5DB', lineHeight: '1.5' }}>
          Sign in to manage your bookings and discover<br />your next tropical adventure
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)',
          color: '#FCA5A5',
          padding: '0.875rem 1rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          textAlign: 'center',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          fontWeight: 600
        }}>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Email Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="email" style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#F9FAFB',
            letterSpacing: '0.3px'
          }}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => handleBlur('email')}
            placeholder="you@example.com"
            required
            style={inputStyle('email')}
          />
          {validationErrors.email && (
            <span style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 600 }}>
              {validationErrors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="password" style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#F9FAFB',
            letterSpacing: '0.3px'
          }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => handleBlur('password')}
              placeholder="Enter your password"
              required
              style={inputStyle('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#FF9E4F',
                cursor: 'pointer',
                fontSize: '1.125rem',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease',
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFD580'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FF9E4F'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {validationErrors.password && (
            <span style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 600 }}>
              {validationErrors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.875rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#1C1C1C',
            background: loading 
              ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.6) 0%, rgba(255, 158, 79, 0.6) 100%)'
              : 'linear-gradient(135deg, #FF6B35 0%, #FF9E4F 50%, #FFD580 100%)',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)',
            transition: 'all 0.3s ease',
            opacity: loading ? 0.7 : 1,
            transform: 'translateY(0)',
            letterSpacing: '0.5px'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 107, 53, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 53, 0.3)';
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid #1C1C1C',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
              Signing In...
            </span>
          ) : 'Sign In to Your Account'}
        </button>
      </form>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        fontSize: '0.9375rem', 
        color: '#D1D5DB',
        fontWeight: 500
      }}>
        New to Ohana Airlines?{' '}
        <Link 
          to="/register" 
          style={{ 
            color: '#FF9E4F', 
            fontWeight: 700, 
            textDecoration: 'none',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFD580';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#FF9E4F';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          Create an account
        </Link>
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;