import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: 'Poppins, sans-serif',
        backgroundImage: 'url("/images/loginregister.jpg")', // full-page background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.35)',
          zIndex: 0,
        }}
      />

      {/* Left side: Header / Branding */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '60px 80px',
          color: '#FFFFFF',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 900,
            marginBottom: '20px',
            lineHeight: '1.2',
            letterSpacing: '1px',
          }}
        >
          Ohana Airlines
        </h1>
        <p
          style={{
            fontSize: '1.3rem',
            maxWidth: '400px',
            lineHeight: '1.6',
            fontWeight: 400,
          }}
        >
          Create a new account to manage your flight bookings and enjoy exclusive features.
        </p>
      </div>

      {/* Right side: Register Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 80px',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
