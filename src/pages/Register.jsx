import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
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
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;