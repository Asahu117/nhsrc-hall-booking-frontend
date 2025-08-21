// File: src/services/hallService.js
// Purpose: This file centralizes all API calls related to halls.


import api from './api';

const getAllHalls = () => api.get('/halls');

export default { getAllHalls };