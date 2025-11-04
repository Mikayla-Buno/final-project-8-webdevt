import React, { useEffect, useState } from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100); // slight delay for fade-in
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: 'Poppins, sans-serif',
        backgroundImage: 'url("/images/loginregister.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
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
          padding: '60px 0 0 80px',
          color: '#FFFFFF',
          position: 'relative',
          zIndex: 1,
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease-out',
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
          Sign in to access your account and manage your flight bookings securely and efficiently.
        </p>
      </div>

      {/* Right side: Login Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 80px',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateX(0)' : 'translateX(30px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
