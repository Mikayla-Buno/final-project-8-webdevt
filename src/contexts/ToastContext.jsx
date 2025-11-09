import React, { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
  const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
  const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);
  const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '400px',
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const styles = {
    success: {
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      icon: <FaCheckCircle size={20} />
    },
    error: {
      background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      icon: <FaExclamationCircle size={20} />
    },
    warning: {
      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      icon: <FaExclamationCircle size={20} />
    },
    info: {
      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      icon: <FaInfoCircle size={20} />
    }
  };

  const typeStyle = styles[toast.type] || styles.info;

  return (
    <div
      style={{
        background: typeStyle.background,
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        animation: isExiting ? 'slideOut 0.3s ease forwards' : 'slideIn 0.3s ease forwards',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        {typeStyle.icon}
      </div>
      <div style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>
        {toast.message}
      </div>
      <button
        onClick={handleClose}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '6px',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          color: 'white',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
      >
        <FaTimes size={14} />
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};