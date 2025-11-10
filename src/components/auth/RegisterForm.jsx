import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const getPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
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
    
    if (field === 'name' && formData.name && formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (field === 'email' && formData.email && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (field === 'phone' && formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (field === 'password' && formData.password && !validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (field === 'confirmPassword' && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors({ ...validationErrors, ...errors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Full validation
    const errors = {};
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name (min. 2 characters)';
    }
    
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (min. 10 digits)';
    }
    
    if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError('Please fix the errors above');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = (fieldName) => ({
    padding: '0.875rem 1rem',
    paddingRight: (fieldName === 'password' || fieldName === 'confirmPassword') ? '3rem' : '1rem',
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

  const passwordStrength = getPasswordStrength(formData.password);

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
      {/* Logo */}
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
          Join Ohana Airlines
        </h1>
        <p style={{ fontSize: '0.9375rem', color: '#D1D5DB', lineHeight: '1.5' }}>
          Create your account and start exploring<br />paradise destinations today
        </p>
      </div>

      {/* Error */}
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Name Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="name" style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#F9FAFB',
            letterSpacing: '0.3px'
          }}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => handleBlur('name')}
            placeholder="John Lowell"
            required
            style={inputStyle('name')}
          />
          {validationErrors.name && (
            <span style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 600 }}>
              {validationErrors.name}
            </span>
          )}
        </div>

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

        {/* Phone Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="phone" style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#F9FAFB',
            letterSpacing: '0.3px'
          }}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => handleBlur('phone')}
            placeholder="+63 (444 ) 123-4567"
            required
            style={inputStyle('phone')}
          />
          {validationErrors.phone && (
            <span style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 600 }}>
              {validationErrors.phone}
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
              placeholder="Create a strong password (min. 6 characters)"
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
          {/* Password Strength Indicator */}
          {formData.password && (
            <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.25rem' }}>
              <div style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' 
                  ? '#EF4444' : 'rgba(255,255,255,0.2)'
              }} />
              <div style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: passwordStrength === 'medium' || passwordStrength === 'strong' 
                  ? '#F59E0B' : 'rgba(255,255,255,0.2)'
              }} />
              <div style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: passwordStrength === 'strong' ? '#10B981' : 'rgba(255,255,255,0.2)'
              }} />
            </div>
          )}
          {formData.password && (
            <span style={{ 
              fontSize: '0.75rem', 
              color: passwordStrength === 'weak' ? '#FCA5A5' : passwordStrength === 'medium' ? '#FCD34D' : '#6EE7B7',
              fontWeight: 600
            }}>
              Strength: {passwordStrength === 'weak' ? 'Weak' : passwordStrength === 'medium' ? 'Medium' : 'Strong'}
            </span>
          )}
          {validationErrors.password && (
            <span style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 600 }}>
              {validationErrors.password}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="confirmPassword" style={{ 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#F9FAFB',
            letterSpacing: '0.3px'
          }}>
            Confirm Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="Re-enter your password"
              required
              style={inputStyle('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {validationErrors.confirmPassword && (
            <span style={{ fontSize: '0.8125rem', color: '#FCA5A5', fontWeight: 600 }}>
              {validationErrors.confirmPassword}
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
            letterSpacing: '0.5px',
            marginTop: '0.5rem'
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
              Creating Account...
            </span>
          ) : 'Create Your Account'}
        </button>
      </form>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem', 
        fontSize: '0.9375rem', 
        color: '#D1D5DB',
        fontWeight: 500
      }}>
        Already have an account?{' '}
        <Link 
          to="/login" 
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
          Sign in here
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

export default RegisterForm;