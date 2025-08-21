
// File: src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null); // keep timer stable across renders

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const scheduleLogout = (expTime) => {
    const expiresIn = expTime * 1000 - Date.now();
    if (expiresIn > 0) {
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, expiresIn);
    } else {
      logout();
    }
  };

  const logout = useCallback(() => {
    clearLogoutTimer();
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const decodedToken = jwtDecode(userData.token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('user');
        } else {
          const newUser = {
            token: userData.token,
            email: decodedToken.sub,
            role: decodedToken.role,
            fullName: decodedToken.fullName,
          };
          setUser(newUser);
          scheduleLogout(decodedToken.exp); // start timer on reload
        }
      }
    } catch (error) {
      localStorage.removeItem('user');
    } finally {
      setIsInitializing(false);
    }
  }, []); // runs only once on init

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.data.jwt) {
      const decodedToken = jwtDecode(response.data.jwt);

      const userData = {
        token: response.data.jwt,
        email: decodedToken.sub,
        role: decodedToken.role,
        fullName: decodedToken.fullName,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      clearLogoutTimer();
      scheduleLogout(decodedToken.exp); // start timer after login

      navigate('/home'); // or role-based routing if needed
    }
    return response;
  };

  const value = { user, login, logout, isInitializing };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
