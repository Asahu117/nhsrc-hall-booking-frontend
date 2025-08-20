// // // import React, { createContext, useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import authService from '../services/authService';
// // // import { jwtDecode } from 'jwt-decode';
// // // import { AuthContext } from '../hooks/useAuth';

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem('user');
// // //     if (storedUser) {
// // //       const userData = JSON.parse(storedUser);
// // //       const decodedToken = jwtDecode(userData.token);
// // //       if (decodedToken.exp * 1000 < Date.now()) {
// // //         logout();
// // //       } else {
// // //         setUser({ ...userData, role: decodedToken.role });
// // //       }
// // //     }
// // //   }, []);

// // //   const login = async (employeeId, password) => {
// // //     const response = await authService.login(employeeId, password);
// // //     if (response.data.jwt) {
// // //       const decodedToken = jwtDecode(response.data.jwt);
// // //       const userData = { 
// // //         token: response.data.jwt, 
// // //         employeeId: decodedToken.sub,
// // //         role: decodedToken.role 
// // //       };
// // //       setUser(userData);
// // //       localStorage.setItem('user', JSON.stringify(userData));
// // //       navigate('/home');
// // //     }
// // //     return response;
// // //   };

// // //   const logout = () => {
// // //     setUser(null);
// // //     localStorage.removeItem('user');
// // //     navigate('/'); // CORRECTED: Navigate to public home page on logout
// // //   };

// // //   const value = { user, login, logout };

// // //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // // };

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import authService from '../services/authService';
// // import { jwtDecode } from 'jwt-decode';
// // import { AuthContext } from '../hooks/useAuth';
// // import PropTypes from 'prop-types';


// // AuthProvider.propTypes = {
// //   children: PropTypes.node.isRequired,
// // };


// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const navigate = useNavigate();

// //   const logout = useCallback(() => {
// //     setUser(null);
// //     localStorage.removeItem('user');
// //     navigate('/');
// //   }, [navigate]);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('user');
// //     if (storedUser) {
// //       const userData = JSON.parse(storedUser);
// //       const decodedToken = jwtDecode(userData.token);
// //       if (decodedToken.exp * 1000 < Date.now()) {
// //         logout();
// //       } else {
// //         setUser({ ...userData, role: decodedToken.role });
// //       }
// //     }
// //   }, [logout]);

// //   const login = async (employeeId, password) => {
// //     const response = await authService.login(employeeId, password);
// //     if (response.data.jwt) {
// //       const decodedToken = jwtDecode(response.data.jwt);
// //       const userData = { 
// //         token: response.data.jwt, 
// //         employeeId: decodedToken.sub,
// //         role: decodedToken.role 
// //       };
// //       setUser(userData);
// //       localStorage.setItem('user', JSON.stringify(userData));
// //       navigate('/home');
// //     }
// //     return response;
// //   };

// //   const value = { user, login, logout };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };
// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';
// import { jwtDecode } from 'jwt-decode';
// import { AuthContext } from '../hooks/useAuth';

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       const decodedToken = jwtDecode(userData.token);
//       if (decodedToken.exp * 1000 < Date.now()) {
//         logout();
//       } else {
//         setUser({ ...userData, role: decodedToken.role });
//       }
//     }
//   }, []);

//   const login = async (employeeId, password) => {
//     const response = await authService.login(employeeId, password);
//     if (response.data.jwt) {
//       const decodedToken = jwtDecode(response.data.jwt);
//       const userData = { 
//         token: response.data.jwt, 
//         employeeId: decodedToken.sub,
//         role: decodedToken.role 
//       };
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//       navigate('/home');
//     }
//     return response;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     navigate('/login'); // Navigate to the standalone login page
//   };

//   const value = { user, login, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const decodedToken = jwtDecode(userData.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser({ ...userData, role: decodedToken.role });
      }
    }
  }, []);

  const login = async (employeeId, password) => {
    const response = await authService.login(employeeId, password);
    if (response.data.jwt) {
      const decodedToken = jwtDecode(response.data.jwt);
      const userData = { 
        token: response.data.jwt, 
        employeeId: decodedToken.sub,
        role: decodedToken.role 
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/home');
    }
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login'); // Navigate to the standalone login page
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};