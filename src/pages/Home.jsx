import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--charcoal) 100%)',
        color: 'white',
        padding: '6rem 1rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>✈️</div>
          <h1 className="font-elegant" style={{ fontSize: '4rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.2' }}>
            Welcome to Ohana Airlines
          </h1>
          <p className="font-base" style={{ fontSize: '1.5rem', marginBottom: '2.5rem', opacity: '0.95', maxWidth: '48rem', margin: '0 auto 2.5rem' }}>
            Experience the joy of flying with our premium service. Your journey begins here with comfort, safety, and aloha spirit.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="elegant-button" style={{ 
                  fontSize: '1.25rem',
                  padding: '1.25rem 3rem'
                }}>
                  Get Started
                </Link>
                <Link to="/login" className="btn" style={{ 
                  background: 'transparent',
                  color: 'white',
                  border: '3px solid white',
                  padding: '1.25rem 3rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: 'Playfair Display, serif'
                }}>
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link to="/flights" className="elegant-button" style={{ 
                  fontSize: '1.25rem',
                  padding: '1.25rem 3rem'
                }}>
                  Book a Flight
                </Link>
                <Link to="/dashboard" className="btn" style={{ 
                  background: 'transparent',
                  color: 'white',
                  border: '3px solid white',
                  padding: '1.25rem 3rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: 'Playfair Display, serif'
                }}>
                  Go to Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 1rem', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="font-elegant" style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--charcoal)', marginBottom: '1rem' }}>
              Why Fly With Ohana?
            </h2>
            <p className="font-base" style={{ fontSize: '1.25rem', color: 'var(--charcoal)', opacity: 0.7, maxWidth: '48rem', margin: '0 auto' }}>
              Discover the benefits that make us the preferred choice for travelers
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <div style={{ textAlign: 'center', padding: '2.5rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--powder-blue)', transition: 'all 0.3s ease' }} className="card">
              <div style={{ 
                width: '6rem', 
                height: '6rem', 
                background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--charcoal) 100%)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '3rem',
                boxShadow: '0 8px 24px rgba(42, 157, 143, 0.3)'
              }}>
                ⚡
              </div>
              <h3 className="font-elegant" style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--charcoal)', marginBottom: '1rem' }}>
                Quick & Easy Booking
              </h3>
              <p className="font-base" style={{ color: 'var(--charcoal)', opacity: 0.7, lineHeight: '1.8', fontSize: '1.0625rem' }}>
                Book your flights in just a few clicks with our intuitive platform. No hassle, no stress.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '2.5rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--pale-dogwood)', transition: 'all 0.3s ease' }} className="card">
              <div style={{ 
                width: '6rem', 
                height: '6rem', 
                background: 'linear-gradient(135deg, var(--satin-gold) 0%, var(--gold-dark) 100%)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '3rem',
                boxShadow: '0 8px 24px rgba(205, 165, 91, 0.3)'
              }}>
                🛡️
              </div>
              <h3 className="font-elegant" style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--charcoal)', marginBottom: '1rem' }}>
                Safe & Secure
              </h3>
              <p className="font-base" style={{ color: 'var(--charcoal)', opacity: 0.7, lineHeight: '1.8', fontSize: '1.0625rem' }}>
                Your safety is our top priority with modern aircraft and highly trained crew members.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '2.5rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--powder-blue)', transition: 'all 0.3s ease' }} className="card">
              <div style={{ 
                width: '6rem', 
                height: '6rem', 
                background: 'linear-gradient(135deg, var(--powder-blue) 0%, var(--blue-munsell) 100%)',
                borderRadius: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '3rem',
                boxShadow: '0 8px 24px rgba(169, 214, 229, 0.3)'
              }}>
                🌟
              </div>
              <h3 className="font-elegant" style={{ fontSize: '1.75rem', fontWeight: '600', color: 'var(--charcoal)', marginBottom: '1rem' }}>
                Best Service
              </h3>
              <p className="font-base" style={{ color: 'var(--charcoal)', opacity: 0.7, lineHeight: '1.8', fontSize: '1.0625rem' }}>
                Experience the aloha spirit with our exceptional customer service at every touchpoint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '6rem 1rem', background: 'linear-gradient(135deg, rgba(169, 214, 229, 0.15) 0%, rgba(232, 196, 196, 0.15) 100%)' }}>
        <div className="container">
          <div className="stats-grid">
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--powder-blue)' }} className="card">
              <div className="stat-number" style={{ fontSize: '4rem' }}>
                50+
              </div>
              <div className="stat-label" style={{ fontSize: '1.125rem' }}>
                Destinations
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--pale-dogwood)' }} className="card">
              <div className="stat-number" style={{ fontSize: '4rem' }}>
                100K+
              </div>
              <div className="stat-label" style={{ fontSize: '1.125rem' }}>
                Happy Customers
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--satin-gold)' }} className="card">
              <div className="stat-number" style={{ fontSize: '4rem' }}>
                24/7
              </div>
              <div className="stat-label" style={{ fontSize: '1.125rem' }}>
                Customer Support
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'white', borderRadius: '1.5rem', border: '2px solid var(--blue-munsell)' }} className="card">
              <div className="stat-number" style={{ fontSize: '4rem' }}>
                99%
              </div>
              <div className="stat-label" style={{ fontSize: '1.125rem' }}>
                On-time Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 1rem',
        background: 'linear-gradient(135deg, var(--satin-gold) 0%, var(--gold-dark) 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="font-elegant" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            Ready to Take Off?
          </h2>
          <p className="font-base" style={{ fontSize: '1.375rem', marginBottom: '2.5rem', opacity: '0.95', maxWidth: '48rem', margin: '0 auto 2.5rem' }}>
            Join thousands of satisfied travelers and experience the difference with Ohana Airlines.
          </p>
          <Link
            to={isAuthenticated ? "/flights" : "/register"}
            style={{ 
              background: 'white', 
              color: 'var(--satin-gold)',
              padding: '1.25rem 3rem',
              fontSize: '1.25rem',
              fontWeight: '700',
              borderRadius: '0.875rem',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              fontFamily: 'Playfair Display, serif',
              transition: 'all 0.3s ease'
            }}
            className="elegant-button"
          >
            {isAuthenticated ? 'Book Your Flight' : 'Create Account'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;