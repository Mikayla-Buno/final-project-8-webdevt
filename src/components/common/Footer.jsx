import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Gradients
  const gradients = {
    sunset: 'linear-gradient(135deg, #FF6B35 0%, #FF9E4F 50%, #FFD580 100%)',
    dark: 'linear-gradient(135deg, rgba(255, 107, 53, 0.6) 0%, rgba(255, 158, 79, 0.6) 50%, rgba(255, 213, 128, 0.6) 100%)'
  };

  return (
    <footer style={{
      background: '#1C1C1C',
      color: '#FF9E4F',
      fontFamily: '"Roboto", sans-serif',
      marginTop: 'auto',
      padding: '2rem 2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient orbs - smaller */}
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '-125px',
        left: '-50px',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255, 158, 79, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '-100px',
        right: '-30px',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '1.5rem'
        }}>
          {/* Brand Section - Compact */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src="/images/lobob.png"
                  alt="Ohana Airlines Logo"
                  style={{ width: '200%', height: '200%', objectFit: 'contain', borderRadius: '6px' }}
                />
              </div>
              <span style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                background: gradients.sunset,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}>
                Ohana Airlines
              </span>
            </div>
            <p style={{
              color: '#FFB347',
              fontSize: '0.8125rem',
              lineHeight: '1.5',
              marginBottom: '0.75rem',
              fontWeight: 500
            }}>
              Experience the spirit of Aloha with world-class service.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <SocialLink href="#" label="Facebook" icon="📘" />
              <SocialLink href="#" label="Twitter" icon="🦅" />
              <SocialLink href="#" label="Instagram" icon="📷" />
              <SocialLink href="#" label="LinkedIn" icon="💼" />
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div>
            <h3 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              background: gradients.sunset,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem'
            }}>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink to="/flights">✈️ Book a Flight</FooterLink>
              <FooterLink to="/bookings">📋 My Bookings</FooterLink>
              <FooterLink to="/about">🏝️ About Us</FooterLink>
              <FooterLink to="/contact">💬 Contact</FooterLink>
            </div>
          </div>

          {/* Legal & Contact - Compact */}
          <div>
            <h3 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              background: gradients.sunset,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem'
            }}>
              Legal & Support
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <FooterLink to="/privacy">🔒 Privacy</FooterLink>
              <FooterLink to="/terms">📜 Terms</FooterLink>
              <FooterLink to="/cookies">🍪 Cookies</FooterLink>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem',
              padding: '0.75rem',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 158, 79, 0.3)'
            }}>
              <ContactInfo icon="📧" href="mailto:support@ohana-air.com" text="support@ohana-air.com" />
              <ContactInfo icon="📞" href="tel:+18001234567" text="1-800-123-4567" />
            </div>
          </div>
        </div>

        {/* Bottom Bar - More Compact */}
        <div style={{
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '1px solid rgba(255, 158, 79, 0.2)'
        }}>
          <p style={{
            color: '#FFB347',
            fontSize: '0.8125rem',
            fontWeight: 600
          }}>
            © {currentYear} Ohana Airlines. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              color: '#FFD580',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.375rem 0.75rem',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(255, 158, 79, 0.2)'
            }}>
              Made with ❤️ by Group 8
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 0.75rem',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(255, 158, 79, 0.2)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FFD580 100%)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 8px rgba(255, 107, 53, 0.6)'
              }}></div>
              <span style={{
                color: '#FF9E4F',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </footer>
  );
};

// Social Link Component - Smaller
const SocialLink = ({ href, label, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isHovered ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 158, 79, 0.1)',
        border: isHovered ? '2px solid rgba(255, 107, 53, 0.5)' : '2px solid rgba(255, 158, 79, 0.2)',
        borderRadius: '8px',
        color: isHovered ? '#FF9E4F' : '#FFD580',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontSize: '0.875rem',
        transform: isHovered ? 'translateY(-3px) rotate(5deg)' : 'translateY(0) rotate(0deg)',
        boxShadow: isHovered ? '0 6px 16px rgba(255, 107, 53, 0.3)' : '0 2px 6px rgba(255, 158, 79, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </a>
  );
};

// Footer Link Component - Smaller
const FooterLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        color: isHovered ? '#FFB347' : '#FFD580',
        textDecoration: 'none',
        fontSize: '0.8125rem',
        transition: 'all 0.3s ease',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0',
        transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

// Contact Info Component - Smaller
const ContactInfo = ({ icon, href, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: isHovered ? '#FF9E4F' : '#FFD580',
        textDecoration: 'none',
        fontSize: '0.75rem',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        padding: '0.25rem 0',
        transform: isHovered ? 'translateX(3px)' : 'translateX(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{
        fontSize: '0.875rem',
        filter: isHovered ? 'drop-shadow(0 2px 4px rgba(255, 107, 53, 0.4))' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {icon}
      </span>
      <span>{text}</span>
    </a>
  );
};

export default Footer;