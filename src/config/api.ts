const API_BASE_URL = 'http://localhost:3001' 
//import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default apiConfig;
