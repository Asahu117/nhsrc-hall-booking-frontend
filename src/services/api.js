// File: src/services/api.js
// Purpose: This file creates a centralized and configured Axios instance.
// It uses an interceptor to automatically add the JWT to the header of every request.


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
  }
);

export default api;