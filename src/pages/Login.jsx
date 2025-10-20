import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div style={{ 
      minHeight: 'calc(100vh - 200px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: '#F8FAFC'
    }}>
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;