import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(169, 214, 229, 0.08) 100%)',
      borderTop: '2px solid transparent',
      borderImage: 'linear-gradient(90deg, rgba(42, 157, 143, 0.3) 0%, rgba(205, 165, 91, 0.3) 100%)',
      borderImageSlice: 1,
      marginTop: 'auto',
      padding: '4rem 0 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient orbs */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(42, 157, 143, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '-200px',
        left: '-100px',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(205, 165, 91, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '-150px',
        right: '-50px',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              marginBottom: '1.25rem' 
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #2A9D8F 0%, #446775 50%, #CDA55B 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                boxShadow: '0 6px 20px rgba(42, 157, 143, 0.4)',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                ✈️
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #2A9D8F 0%, #446775 50%, #CDA55B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}>
                Ohana Airlines
              </span>
            </div>
            <p style={{ 
              color: '#64748B', 
              fontSize: '0.9375rem', 
              lineHeight: '1.7',
              marginBottom: '1.5rem',
              fontWeight: 500
            }}>
              Experience the spirit of Aloha with world-class service and unforgettable journeys to paradise.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <SocialLink href="#" label="Facebook" icon="📘" />
              <SocialLink href="#" label="Twitter" icon="🦅" />
              <SocialLink href="#" label="Instagram" icon="📷" />
              <SocialLink href="#" label="LinkedIn" icon="💼" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #2A9D8F 0%, #CDA55B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.25rem'
            }}>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <FooterLink to="/flights">✈️ Book a Flight</FooterLink>
              <FooterLink to="/bookings">📋 My Bookings</FooterLink>
              <FooterLink to="/about">🏝️ About Us</FooterLink>
              <FooterLink to="/contact">💬 Contact Support</FooterLink>
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #2A9D8F 0%, #CDA55B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.25rem'
            }}>
              Legal & Support
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <FooterLink to="/privacy">🔒 Privacy Policy</FooterLink>
              <FooterLink to="/terms">📜 Terms of Service</FooterLink>
              <FooterLink to="/cookies">🍪 Cookie Policy</FooterLink>
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.75rem',
              padding: '1.25rem',
              background: 'linear-gradient(135deg, rgba(169, 214, 229, 0.15) 0%, rgba(232, 196, 196, 0.15) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(42, 157, 143, 0.2)'
            }}>
              <ContactInfo icon="📧" href="mailto:support@ohana-air.com" text="support@ohana-air.com" />
              <ContactInfo icon="📞" href="tel:+18001234567" text="1-800-123-4567" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '2px solid transparent',
          borderImage: 'linear-gradient(90deg, rgba(42, 157, 143, 0.2) 0%, rgba(205, 165, 91, 0.2) 100%)',
          borderImageSlice: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <p style={{ 
            color: '#64748B', 
            fontSize: '0.875rem',
            fontWeight: 600
          }}>
            © {currentYear} Ohana Airlines. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ 
              color: '#94A3B8', 
              fontSize: '0.8125rem',
              fontWeight: 600,
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, rgba(169, 214, 229, 0.2) 0%, rgba(232, 196, 196, 0.2) 100%)',
              borderRadius: '8px',
              border: '1px solid rgba(42, 157, 143, 0.15)'
            }}>
              Made with ❤️ by Group 8
            </span>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.625rem',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, rgba(42, 157, 143, 0.1) 0%, rgba(205, 165, 91, 0.1) 100%)',
              borderRadius: '8px',
              border: '1px solid rgba(42, 157, 143, 0.2)'
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                background: 'linear-gradient(135deg, #2A9D8F 0%, #CDA55B 100%)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                boxShadow: '0 0 10px rgba(42, 157, 143, 0.6)'
              }}></div>
              <span style={{ 
                color: '#2A9D8F', 
                fontSize: '0.8125rem',
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
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.1);
          }
        }
      `}</style>
    </footer>
  );
};

// Social Link Component
const SocialLink = ({ href, label, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isHovered 
          ? 'linear-gradient(135deg, rgba(42, 157, 143, 0.2) 0%, rgba(205, 165, 91, 0.2) 100%)'
          : 'rgba(169, 214, 229, 0.15)',
        border: isHovered 
          ? '2px solid rgba(42, 157, 143, 0.5)'
          : '2px solid rgba(169, 214, 229, 0.3)',
        borderRadius: '12px',
        color: isHovered ? '#2A9D8F' : '#446775',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
        transform: isHovered ? 'translateY(-4px) rotate(5deg)' : 'translateY(0) rotate(0deg)',
        boxShadow: isHovered 
          ? '0 8px 20px rgba(42, 157, 143, 0.3)'
          : '0 2px 8px rgba(42, 157, 143, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </a>
  );
};

// Footer Link Component
const FooterLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        color: isHovered ? '#2A9D8F' : '#64748B',
        textDecoration: 'none',
        fontSize: '0.9375rem',
        transition: 'all 0.3s ease',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0',
        transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <span style={{
          position: 'absolute',
          left: '-12px',
          background: 'linear-gradient(135deg, #2A9D8F 0%, #CDA55B 100%)',
          width: '4px',
          height: '100%',
          borderRadius: '2px'
        }} />
      )}
      {children}
    </Link>
  );
};

// Contact Info Component
const ContactInfo = ({ icon, href, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: isHovered ? '#2A9D8F' : '#446775',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 600,
        transition: 'all 0.3s ease',
        padding: '0.375rem 0',
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{
        fontSize: '1.125rem',
        filter: isHovered ? 'drop-shadow(0 2px 4px rgba(42, 157, 143, 0.4))' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {icon}
      </span>
      <span>{text}</span>
    </a>
  );
};

export default Footer;