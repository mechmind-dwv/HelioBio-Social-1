import axios from 'axios';

const API_BASE_URL = 'http://localhost:1110';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const solarAPI = {
  getCurrent: () => api.get('/api/v1/solar/current'),
  getForecast: () => api.get('/api/v1/solar/forecast'),
};

export const mentalHealthAPI = {
  getGlobal: () => api.get('/api/v1/mental/global'),
  getCorrelation: () => api.get('/api/v1/mental/correlation'),
};

export default api;
