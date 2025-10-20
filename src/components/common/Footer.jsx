import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'white', 
      borderTop: '1px solid #E2E8F0',
      marginTop: 'auto',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
              © {currentYear} Ohana Airlines. All rights reserved.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#64748B', fontSize: '0.875rem', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: '#64748B', fontSize: '0.875rem', textDecoration: 'none' }}>
              Terms of Service
            </a>
            <a href="#" style={{ color: '#64748B', fontSize: '0.875rem', textDecoration: 'none' }}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;