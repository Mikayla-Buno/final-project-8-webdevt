import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      style={{
        fontFamily: '"Inter", sans-serif',
        color: '#1F2937',
        backgroundImage: 'url("/images/home-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          backgroundColor: 'rgba(30, 41, 59, 0.7)', // soft dark blue overlay
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            color: '#FFFFFF',
            padding: '6rem 1rem',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              zIndex: 1,
              position: 'relative',
            }}
          >
            <h1
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              Welcome to Ohana Airlines
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.8,
                opacity: 0.9,
                marginBottom: '2.5rem',
                color: '#E5E7EB',
              }}
            >
              Fly with confidence and elegance. Experience premium service, comfort, and safety on every journey.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    style={{
                      background: '#F59E0B',
                      color: '#1F2937',
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      border: '2px solid #FFFFFF',
                      color: '#FFFFFF',
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/flights"
                    style={{
                      background: '#F59E0B',
                      color: '#1F2937',
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Book a Flight
                  </Link>
                  <Link
                    to="/dashboard"
                    style={{
                      border: '2px solid #FFFFFF',
                      color: '#FFFFFF',
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '6rem 1rem', background: 'rgba(255,255,255,0.8)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#1E3A8A',
                }}
              >
                Why Fly With Us
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#374151',
                  opacity: 0.85,
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                We provide a seamless, secure, and premium flying experience for our passengers.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid #E5E7EB',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  cursor: 'default',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Fast & Easy Booking</h3>
                <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Book your flight quickly and efficiently with our intuitive platform.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid #E5E7EB',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  cursor: 'default',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Safe & Secure</h3>
                <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Your safety is our priority with advanced aircraft and trained crew.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid #E5E7EB',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  cursor: 'default',
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Premium Service</h3>
                <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.6 }}>
                  Experience excellent customer support and care throughout your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: '6rem 1rem',
            background: 'rgba(30, 58, 138, 0.9)',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              Ready to Take Off?
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                opacity: 0.9,
                marginBottom: '2rem',
                color: '#E5E7EB',
              }}
            >
              Join thousands of satisfied travelers and experience the difference with Ohana Airlines.
            </p>
            <Link
              to={isAuthenticated ? '/flights' : '/register'}
              style={{
                background: '#F59E0B',
                color: '#1F2937',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {isAuthenticated ? 'Book Your Flight' : 'Create Account'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
