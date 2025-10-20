import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('ohana_user');
    const sessionId = localStorage.getItem('ohana_session_id');
    
    if (savedUser && sessionId) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // Mock users database - in production, this would be an API call
    const mockUsers = [
      {
        id: 1,
        email: 'admin@ohana.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        phone: '+63-917-123-4567'
      },
      {
        id: 2,
        email: 'user@ohana.com',
        password: 'user123',
        role: 'user',
        name: 'John Passenger',
        phone: '+63-917-987-6543'
      },
      {
        id: 3,
        email: 'maria@email.com',
        password: 'maria123',
        role: 'user',
        name: 'Maria Santos',
        phone: '+63-918-555-1234'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      // Store user data and session
      localStorage.setItem('ohana_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('ohana_session_id', sessionId);
      
      setLoading(false);
      return { success: true };
    }
    
    setLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('ohana_registered_users') || '[]');
    const emailExists = existingUsers.some(u => u.email === userData.email);
    
    if (emailExists) {
      setLoading(false);
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(), // Unique ID based on timestamp
      ...userData,
      role: 'user' // All registered users are regular users
    };
    
    // Save to registered users list
    existingUsers.push(newUser);
    localStorage.setItem('ohana_registered_users', JSON.stringify(existingUsers));
    
    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser;
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    localStorage.setItem('ohana_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('ohana_session_id', sessionId);
    
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear user session
    localStorage.removeItem('ohana_user');
    localStorage.removeItem('ohana_session_id');
    
    // Clear any cached data specific to this user
    // Note: We keep flight data and other users' bookings intact
  };

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('ohana_user', JSON.stringify(updatedUser));
    
    // Update in registered users list
    const existingUsers = JSON.parse(localStorage.getItem('ohana_registered_users') || '[]');
    const updatedUsers = existingUsers.map(u => 
      u.id === updatedUser.id ? { ...u, ...userData } : u
    );
    localStorage.setItem('ohana_registered_users', JSON.stringify(updatedUsers));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}