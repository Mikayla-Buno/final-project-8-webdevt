import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../Animation.css'; // Make sure this CSS file contains the animation

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="login-form-animated" style={{
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
    }}>
      {/* Logo and Welcome */}
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
          Welcome Back
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#E5E7EB' }}>
          Sign in to your Ohana Airlines account
        </p>
      </div>

      {/* Error Message */}
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
        {['email', 'password'].map((field) => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label htmlFor={field} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F9FAFB' }}>
              {field === 'email' ? 'Email Address' : 'Password'}
            </label>
            <input
              type={field}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === 'email' ? 'Enter your email' : 'Enter your password'}
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
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#E5E7EB' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#2A9D8F', fontWeight: 600, textDecoration: 'none' }}>
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
