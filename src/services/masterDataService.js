// File: src/services/masterDataService.js
// UPDATED: Added the missing getDepartments function.

import api from './api';

const getMeetingTypes = () => {
  return api.get('/master/meeting-types');
};

const getDepartments = () => {
  return api.get('/master/departments'); // This function was missing
};

const masterDataService = {
  getMeetingTypes,
  getDepartments, // Export the new function
};

export default masterDataService;