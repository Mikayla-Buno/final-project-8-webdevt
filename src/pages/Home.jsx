import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', color: '#1F2937' }}>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)',
        color: '#FFFFFF',
        padding: '6rem 1rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Welcome to Ohana Airlines
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.8, opacity: 0.9, marginBottom: '2.5rem', color: '#E5E7EB' }}>
            Fly with confidence and elegance. Experience premium service, comfort, and safety on every journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isAuthenticated ? (
              <>
                <Link to="/register" style={{
                  background: '#F59E0B',
                  color: '#1F2937',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>Create Account</Link>
                <Link to="/login" style={{
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  textDecoration: 'none'
                }}>Sign In</Link>
              </>
            ) : (
              <>
                <Link to="/flights" style={{
                  background: '#F59E0B',
                  color: '#1F2937',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>Book a Flight</Link>
                <Link to="/dashboard" style={{
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  borderRadius: '0.5rem',
                  textDecoration: 'none'
                }}>Dashboard</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 1rem', background: '#F9FAFB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Why Fly With Us
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4B5563', opacity: 0.85, maxWidth: '600px', margin: '0 auto' }}>
              We provide a seamless, secure, and premium flying experience for our passengers.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Feature 1 */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              transition: 'transform 0.3s',
              cursor: 'default'
            }} className="feature-card">
              <div style={{ fontSize: '2rem', color: '#1E3A8A', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Fast & Easy Booking</h3>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
                Book your flight quickly and efficiently with our intuitive platform.
              </p>
            </div>
            {/* Feature 2 */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              transition: 'transform 0.3s',
              cursor: 'default'
            }} className="feature-card">
              <div style={{ fontSize: '2rem', color: '#F59E0B', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Safe & Secure</h3>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
                Your safety is our priority with advanced aircraft and trained crew.
              </p>
            </div>
            {/* Feature 3 */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              transition: 'transform 0.3s',
              cursor: 'default'
            }} className="feature-card">
              <div style={{ fontSize: '2rem', color: '#1E3A8A', marginBottom: '1rem' }}>🌟</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Premium Service</h3>
              <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
                Experience excellent customer support and care throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '6rem 1rem', background: '#EFF6FF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '1rem', padding: '2rem', border: '1px solid #D1D5DB' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.5rem' }}>50+</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#4B5563' }}>Destinations</div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: '1rem', padding: '2rem', border: '1px solid #D1D5DB' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.5rem' }}>100K+</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#4B5563' }}>Happy Customers</div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: '1rem', padding: '2rem', border: '1px solid #D1D5DB' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.5rem' }}>24/7</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#4B5563' }}>Customer Support</div>
          </div>
          <div style={{ background: '#FFFFFF', borderRadius: '1rem', padding: '2rem', border: '1px solid #D1D5DB' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1E3A8A', marginBottom: '0.5rem' }}>99%</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#4B5563' }}>On-time Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 1rem',
        background: '#1E3A8A',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Take Off?
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', color: '#E5E7EB' }}>
            Join thousands of satisfied travelers and experience the difference with Ohana Airlines.
          </p>
          <Link
            to={isAuthenticated ? "/flights" : "/register"}
            style={{
              background: '#F59E0B',
              color: '#1F2937',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {isAuthenticated ? 'Book Your Flight' : 'Create Account'}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
