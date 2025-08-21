

import api from './api';

const createUser = (userData) => {
  return api.post('/users/create', userData);
};

// We can add functions to get the list of managed users here later
// const getManagedUsers = () => { ... }

const adminService = {
  createUser,
};

export default adminService;
