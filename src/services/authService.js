import api from './api';

const login = (email, password) => api.post('/auth/login', { email, password });

// Step 1: Request an OTP to be sent to the user's email
const requestOtp = (registrationData) => {
  return api.post('/auth/register/request-otp', registrationData);
};

// Step 2: Send the email and OTP to the backend for verification
const verifyOtpAndRegister = (verificationData) => {
  return api.post('/auth/register/verify-otp', verificationData);
};


export default { 
  login, 
  requestOtp, 
  verifyOtpAndRegister 
};