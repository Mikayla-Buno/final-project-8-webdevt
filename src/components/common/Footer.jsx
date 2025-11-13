import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, rgba(28, 28, 28, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontFamily: '"Roboto", sans-serif',
        marginTop: 'auto',
        padding: '3rem 2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient orbs */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-200px',
          left: '-100px',
          pointerEvents: 'none',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 158, 79, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-150px',
          right: '-80px',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 107, 53, 0.1)',
                  border: '1px solid rgba(255, 107, 53, 0.3)',
                  boxShadow: '0 4px 12px rgba(255, 107, 53, 0.2)',
                }}
              >
                <img
                  src="/images/lobob.png"
                  alt="Ohana Airlines Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF9E4F 50%, #FFD580 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.02em',
                }}
              >
                Ohana Airlines
              </span>
            </div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontWeight: 400,
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            >
              Experience the spirit of Aloha with world-class service. Your journey begins with family.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <SocialLink href="https://facebook.com" label="Facebook" icon="📘" />
              <SocialLink href="https://twitter.com" label="Twitter" icon="🐦" />
              <SocialLink href="https://instagram.com" label="Instagram" icon="📷" />
              <SocialLink href="https://linkedin.com" label="LinkedIn" icon="💼" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1.25rem',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <FooterLink to="/flights" icon="✈️">
                Book a Flight
              </FooterLink>
              <FooterLink to="/bookings" icon="📋">
                My Bookings
              </FooterLink>
              <FooterLink to="/dashboard" icon="📊">
                Dashboard
              </FooterLink>
              <FooterLink to="/about" icon="🏝️">
                About Us
              </FooterLink>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              Get in Touch
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.25rem',
                borderRadius: '12px',
              }}
            >
              <ContactInfo icon="📧" href="mailto:support@ohana-air.com" text="support@ohana-air.com" />
              <ContactInfo icon="📞" href="tel:+18001234567" text="1-800-OHANA-AIR" />
              <ContactInfo icon="📍" text="De La Salle Lipa City" />
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    background: '#10B981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                  }}
                ></div>
                <span
                  style={{
                    color: '#10B981',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  24/7 Customer Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              }}
            >
              © {currentYear} Ohana Airlines. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <SmallLink to="/privacy">Privacy Policy</SmallLink>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
              <SmallLink to="/terms">Terms of Service</SmallLink>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
              <SmallLink to="/cookies">Cookie Policy</SmallLink>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '0.625rem 1.25rem',
                background: 'rgba(255, 107, 53, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 107, 53, 0.3)',
                boxShadow: '0 2px 8px rgba(255, 107, 53, 0.2)',
              }}
            >
              <span
                style={{
                  color: '#FF9E4F',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                Made with ❤️ by Group 8
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isHovered ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: isHovered ? '1px solid rgba(255, 107, 53, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: '#ffffff',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        fontSize: '1.25rem',
        transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? '0 8px 20px rgba(255, 107, 53, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </a>
  );
};

// Footer Link Component
const FooterLink = ({ to, children, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        color: isHovered ? '#FF9E4F' : 'rgba(255, 255, 255, 0.8)',
        textDecoration: 'none',
        fontSize: '0.9375rem',
        transition: 'all 0.3s ease',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.5rem 0',
        transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
        textShadow: isHovered ? '0 2px 8px rgba(255, 158, 79, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: '1rem', transition: 'all 0.3s ease', transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}>
        {icon}
      </span>
      {children}
    </Link>
  );
};

// Contact Info Component
const ContactInfo = ({ icon, href, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Component = href ? 'a' : 'div';

  return (
    <Component
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: isHovered ? '#FF9E4F' : 'rgba(255, 255, 255, 0.9)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        padding: '0.375rem 0',
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
        cursor: href ? 'pointer' : 'default',
        textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        style={{
          fontSize: '1.125rem',
          filter: isHovered ? 'drop-shadow(0 2px 6px rgba(255, 107, 53, 0.5))' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {icon}
      </span>
      <span style={{ lineHeight: 1.4 }}>{text}</span>
    </Component>
  );
};

// Small Link Component
const SmallLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        color: isHovered ? '#FF9E4F' : 'rgba(255, 255, 255, 0.6)',
        textDecoration: 'none',
        fontSize: '0.8125rem',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        textShadow: isHovered ? '0 1px 4px rgba(255, 158, 79, 0.4)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default Footer;