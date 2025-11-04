import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'white',
      borderTop: '1px solid rgba(169, 214, 229, 0.3)',
      marginTop: 'auto',
      padding: '3rem 0 2rem'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--charcoal) 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.25rem',
                boxShadow: '0 4px 12px rgba(42, 157, 143, 0.3)'
              }}>
                ✈️
              </div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--blue-munsell) 0%, var(--charcoal) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Ohana Airlines
              </span>
            </div>
            <p style={{ 
              color: '#64748B', 
              fontSize: '0.875rem', 
              lineHeight: '1.6',
              marginBottom: '1rem' 
            }}>
              Experience the spirit of Aloha with world-class service and unforgettable journeys.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <SocialLink href="#" label="Facebook" icon="📘" />
              <SocialLink href="#" label="Twitter" icon="🐦" />
              <SocialLink href="#" label="Instagram" icon="📷" />
              <SocialLink href="#" label="LinkedIn" icon="💼" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--charcoal)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink to="/flights">Book a Flight</FooterLink>
              <FooterLink to="/bookings">My Bookings</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact Support</FooterLink>
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--charcoal)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}>
              Legal
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <ContactInfo icon="📧" href="mailto:support@ohana-air.com" text="support@ohana-air.com" />
              <ContactInfo icon="📞" href="tel:+18001234567" text="1-800-123-4567" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(169, 214, 229, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
            © {currentYear} Ohana Airlines. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
              Made by Group 8
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: 'var(--blue-munsell)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Link Component
const SocialLink = ({ href, label, icon }) => (
  <a
    href={href}
    aria-label={label}
    style={{
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(169, 214, 229, 0.15)',
      border: '1px solid rgba(169, 214, 229, 0.3)',
      borderRadius: '0.5rem',
      color: 'var(--blue-munsell)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(42, 157, 143, 0.15)';
      e.currentTarget.style.borderColor = 'var(--blue-munsell)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(169, 214, 229, 0.15)';
      e.currentTarget.style.borderColor = 'rgba(169, 214, 229, 0.3)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {icon}
  </a>
);

// Footer Link Component
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      color: '#64748B',
      textDecoration: 'none',
      fontSize: '0.875rem',
      transition: 'color 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = 'var(--blue-munsell)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = '#64748B';
    }}
  >
    {children}
  </Link>
);

// Contact Info Component
const ContactInfo = ({ icon, href, text }) => (
  <a
    href={href}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#64748B',
      textDecoration: 'none',
      fontSize: '0.875rem',
      transition: 'color 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = 'var(--blue-munsell)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = '#64748B';
    }}
  >
    <span>{icon}</span>
    <span>{text}</span>
  </a>
);

export default Footer;