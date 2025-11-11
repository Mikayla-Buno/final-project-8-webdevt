import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    if (!profileData.name.trim() || profileData.name.length < 2) {
      showMessage('error', 'Name must be at least 2 characters');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      showMessage('error', 'Please enter a valid email address');
      return;
    }
    
    const result = updateProfile(profileData);
    if (result.success) {
      showMessage('success', 'Profile updated successfully!');
      setIsEditing(false);
    } else {
      showMessage('error', result.error || 'Failed to update profile');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'New password must be at least 6 characters');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }
    
    // In a real app, you would verify the current password
    showMessage('success', 'Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordModal(false);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() !== 'delete my account') {
      showMessage('error', 'Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }
    
    // Remove user from storage
    localStorage.removeItem('ohana_user');
    localStorage.removeItem('ohana_session');
    
    // Remove from registered users
    const registeredUsers = JSON.parse(localStorage.getItem('ohana_registered_users') || '[]');
    const updatedUsers = registeredUsers.filter(u => u.id !== user.id);
    localStorage.setItem('ohana_registered_users', JSON.stringify(updatedUsers));
    
    logout();
    navigate('/');
  };

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: `url('/images/home.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#ffffff',
              textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
            }}
          >
            My Profile
          </h1>
          <p style={{ fontSize: '18px', color: '#ffffff', fontWeight: '500', textShadow: '0 1px 8px rgba(0, 0, 0, 0.2)' }}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              marginBottom: '24px',
              background: message.type === 'success' 
                ? 'rgba(16, 185, 129, 0.15)' 
                : 'rgba(239, 68, 68, 0.15)',
              border: `2px solid ${message.type === 'success' ? '#10B981' : '#EF4444'}`,
              color: '#ffffff',
              fontWeight: '600',
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              animation: 'fadeSlideUp 0.4s ease-out',
            }}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div
          style={{
            marginBottom: '32px',
            borderRadius: '16px',
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} icon="👤">
            Profile Info
          </TabButton>
          <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon="🔒">
            Security
          </TabButton>
          {user?.role !== 'admin' && (
            <TabButton active={activeTab === 'danger'} onClick={() => setActiveTab('danger')} icon="⚠️">
              Delete Account
            </TabButton>
          )}
        </div>

        {/* Content */}
        {activeTab === 'info' && (
          <div
            style={{
              borderRadius: '20px',
              padding: '32px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              animation: 'fadeSlideUp 0.5s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff' }}>Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    background: 'rgba(255, 107, 53, 0.2)',
                    color: '#ffffff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <InfoField label="Full Name" value={user?.name} />
                <InfoField label="Email Address" value={user?.email} />
                <InfoField label="Phone Number" value={user?.phone || 'Not provided'} />
                <InfoField label="Account Type" value={user?.role === 'admin' ? 'Administrator' : 'Regular User'} />
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <FormField
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                  />
                  <FormField
                    label="Phone Number"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setProfileData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
                    }}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div
            style={{
              borderRadius: '20px',
              padding: '32px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              animation: 'fadeSlideUp 0.5s ease-out',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '24px' }}>
              Security Settings
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff', marginBottom: '12px' }}>
                Password
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '16px' }}>
                Keep your account secure by using a strong password
              </p>
              <button
                onClick={() => setShowPasswordModal(true)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  background: 'rgba(255, 107, 53, 0.2)',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                🔑 Change Password
              </button>
            </div>
          </div>
        )}

        {activeTab === 'danger' && user?.role !== 'admin' && (
          <div
            style={{
              borderRadius: '20px',
              padding: '32px',
              background: 'rgba(239, 68, 68, 0.15)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(239, 68, 68, 0.4)',
              animation: 'fadeSlideUp 0.5s ease-out',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
              ⚠️ Danger Zone
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '24px', lineHeight: '1.6' }}>
              Once you delete your account, there is no going back. This action will permanently delete your account, 
              including all your bookings and personal information.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid #EF4444',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ffffff',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              🗑️ Delete My Account
            </button>
          </div>
        )}

        {/* Password Change Modal */}
        {showPasswordModal && (
          <Modal onClose={() => setShowPasswordModal(false)}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937', marginBottom: '24px' }}>
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <FormField
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                  dark
                />
                <FormField
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                  dark
                />
                <FormField
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                  dark
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#EF4444', marginBottom: '12px' }}>
                Delete Account
              </h2>
              <p style={{ color: '#64748B', lineHeight: '1.6' }}>
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1F2937' }}>
                Type "DELETE MY ACCOUNT" to confirm
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE MY ACCOUNT"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Delete Forever
              </button>
            </div>
          </Modal>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ active, onClick, icon, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: 1,
        minWidth: '150px',
        padding: '12px 20px',
        borderRadius: '12px',
        border: 'none',
        background: active
          ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
          : isHovered
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: active ? '0 4px 12px rgba(255, 107, 53, 0.4)' : 'none',
      }}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};

// Info Field Component
const InfoField = ({ label, value }) => (
  <div
    style={{
      padding: '16px',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }}
  >
    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px', textTransform: 'uppercase' }}>
      {label}
    </label>
    <p style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>{value}</p>
  </div>
);

// Form Field Component
const FormField = ({ label, type = 'text', value, onChange, required, dark }) => (
  <div>
    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: dark ? '#1F2937' : '#ffffff' }}>
      {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: dark ? '2px solid rgba(0, 0, 0, 0.1)' : '2px solid rgba(255, 255, 255, 0.3)',
        background: dark ? 'white' : 'rgba(255, 255, 255, 0.1)',
        color: dark ? '#1F2937' : '#ffffff',
        fontSize: '14px',
        transition: 'all 0.3s',
      }}
    />
  </div>
);

// Modal Component
const Modal = ({ children, onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'white',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        animation: 'fadeSlideUp 0.3s ease-out',
      }}
    >
      {children}
    </div>
  </div>
);

export default Profile;