// // File: src/services/hallService.js
// // Purpose: This file centralizes all API calls related to halls.

// import api from './api';

// const getAllHalls = () => {
//   return api.get('/halls'); // Assumes a GET /api/halls endpoint exists
// };

// const hallService = {
//   getAllHalls,
// };

// export default hallService;

import api from './api';

const getAllHalls = () => api.get('/halls');

export default { getAllHalls };