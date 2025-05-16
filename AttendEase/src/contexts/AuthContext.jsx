import React, { createContext, useContext, useState } from 'react';
import db from '../data/db';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState('');

  const login = (uid, role) => {
    setError('');
    
    const user = db.find(u => u.uid === uid && u.role === (role === 'teacher' ? 'Teacher' : 'Student'));
    
    if (user) {
      setCurrentUser(user);
      setUserRole(role);
      return true;
    }
    
    setError(`${role === 'teacher' ? 'Teacher' : 'Student'} ID not found`);
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}