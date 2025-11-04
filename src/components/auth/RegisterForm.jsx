import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../Animation.css'; // Import your animation CSS

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

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
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

  return (
    <div
      className="login-form-animated" // Add animation class
      style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        boxShadow: '0 16px 40px rgba(0,0,0,0.1)'
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src="/images/logoa.png"
          alt="Ohana Airlines Logo"
          style={{
            width: '200px',
            height: '160px',
            borderRadius: '16px',
            objectFit: 'cover',
          }}
        />
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F9FAFB', marginBottom: '0.25rem' }}>
          Create Account
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#E5E7EB' }}>
          Join Ohana Airlines today
        </p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: '#FEE2E2',
          color: '#B91C1C',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['name', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label htmlFor={field} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F9FAFB' }}>
              {field === 'name' ? 'Full Name' :
               field === 'email' ? 'Email Address' :
               field === 'phone' ? 'Phone Number' :
               field === 'password' ? 'Password' : 'Confirm Password'}
            </label>
            <input
              type={field.includes('password') ? 'password' : field === 'phone' ? 'tel' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field === 'name' ? 'Enter your full name' :
                field === 'email' ? 'Enter your email' :
                field === 'phone' ? 'Enter your phone number' :
                field === 'password' ? 'Create a password (min. 6 characters)' :
                'Confirm your password'
              }
              required
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.3)',
                fontSize: '0.9375rem',
                outline: 'none',
                background: 'rgba(255,255,255,0.05)',
                color: '#F9FAFB',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#FFFFFF',
            background: 'linear-gradient(135deg, #2A9D8F 0%, #446775 50%, #CDA55B 100%)',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(42,157,143,0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#E5E7EB' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#2A9D8F', fontWeight: 600, textDecoration: 'none' }}>
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
