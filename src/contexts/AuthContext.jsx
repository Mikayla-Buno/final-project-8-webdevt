import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Session timeout: 24 hours
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

// Safe localStorage wrapper
const safeStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`localStorage get failed for key "${key}":`, error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`localStorage set failed for key "${key}":`, error);
      if (error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded. Consider clearing old data.');
      }
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`localStorage remove failed for key "${key}":`, error);
      return false;
    }
  }
};

// Validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Mock users for development/demo
const mockUsers = [
  {
    id: 1,
    email: 'admin@ohana.com',
    passwordHash: 'admin123',
    role: 'admin',
    name: 'Admin User',
    phone: '+63-917-123-4567'
  },
  {
    id: 2,
    email: 'user@ohana.com',
    passwordHash: 'user123',
    role: 'user',
    name: 'John Passenger',
    phone: '+63-917-987-6543'
  },
  {
    id: 3,
    email: 'maria@email.com',
    passwordHash: 'maria123',
    role: 'user',
    name: 'Maria Santos',
    phone: '+63-918-555-1234'
  }
];

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if session is valid
  const isSessionValid = (sessionData) => {
    if (!sessionData || !sessionData.timestamp) return false;
    const now = Date.now();
    return (now - sessionData.timestamp) < SESSION_TIMEOUT;
  };

  useEffect(() => {
    // Check for saved user session
    const savedUser = safeStorage.get('ohana_user');
    const sessionData = safeStorage.get('ohana_session');
    
    if (savedUser && sessionData && isSessionValid(sessionData)) {
      setUser(savedUser);
      setIsAuthenticated(true);
    } else {
      // Clear invalid session
      safeStorage.remove('ohana_user');
      safeStorage.remove('ohana_session');
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Validate inputs
      if (!validateEmail(email)) {
        setLoading(false);
        return { success: false, error: 'Invalid email format' };
      }

      if (!password) {
        setLoading(false);
        return { success: false, error: 'Password is required' };
      }

      // Get registered users from storage
      const registeredUsers = safeStorage.get('ohana_registered_users', []);
      const allUsers = [...mockUsers, ...(Array.isArray(registeredUsers) ? registeredUsers : [])];

      // Find user (using passwordHash for mock users, password for registered)
      const foundUser = allUsers.find(u => 
        u.email === email && (u.passwordHash === password || u.password === password)
      );
      
      if (foundUser) {
        // Remove password from user object
        const { password: _, passwordHash: __, ...userWithoutPassword } = foundUser;
        
        const sessionData = {
          id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        };
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        // Store user data and session
        safeStorage.set('ohana_user', userWithoutPassword);
        safeStorage.set('ohana_session', sessionData);
        
        setLoading(false);
        return { success: true, user: userWithoutPassword };
      }
      
      setLoading(false);
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    try {
      // Validate inputs
      if (!validateEmail(userData.email)) {
        setLoading(false);
        return { success: false, error: 'Invalid email format' };
      }

      if (!validatePassword(userData.password)) {
        setLoading(false);
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      if (!userData.name || userData.name.trim().length < 2) {
        setLoading(false);
        return { success: false, error: 'Name must be at least 2 characters' };
      }

      // Check if email already exists
      const existingUsers = safeStorage.get('ohana_registered_users', []);
      const allEmails = [
        ...mockUsers.map(u => u.email), 
        ...(Array.isArray(existingUsers) ? existingUsers.map(u => u.email) : [])
      ];
      
      if (allEmails.includes(userData.email)) {
        setLoading(false);
        return { success: false, error: 'Email already registered' };
      }
      
      // Create new user (store password temporarily for login)
      // In production, this would be handled by backend with proper hashing
      const newUser = {
        id: Date.now(),
        email: userData.email,
        password: userData.password, // Stored for demo purposes only
        name: userData.name,
        phone: userData.phone || '',
        role: 'user'
      };
      
      // Save to registered users list
      if (!Array.isArray(existingUsers)) {
        console.error('Existing users is not an array, resetting...');
        safeStorage.set('ohana_registered_users', [newUser]);
      } else {
        safeStorage.set('ohana_registered_users', [...existingUsers, newUser]);
      }
      
      // Log the user in
      const { password: _, ...userWithoutPassword } = newUser;
      const sessionData = {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
      };
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      safeStorage.set('ohana_user', userWithoutPassword);
      safeStorage.set('ohana_session', sessionData);
      
      setLoading(false);
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear user session
    safeStorage.remove('ohana_user');
    safeStorage.remove('ohana_session');
  };

  const updateProfile = (userData) => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' };
      }

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      safeStorage.set('ohana_user', updatedUser);
      
      // Update in registered users list
      const existingUsers = safeStorage.get('ohana_registered_users', []);
      if (Array.isArray(existingUsers)) {
        const updatedUsers = existingUsers.map(u => 
          u.id === updatedUser.id ? { ...u, ...userData } : u
        );
        safeStorage.set('ohana_registered_users', updatedUsers);
      }

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  };

  // Refresh session timestamp
  const refreshSession = () => {
    const sessionData = safeStorage.get('ohana_session');
    if (sessionData) {
      sessionData.timestamp = Date.now();
      safeStorage.set('ohana_session', sessionData);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}