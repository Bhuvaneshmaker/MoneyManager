import axios from 'axios';
import { auth } from '../firebase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const transactionAPI = {
  // Get all transactions
  getAll: () => api.get('/transactions'),
  
  // Get transaction by ID
  getById: (id) => api.get(`/transactions/${id}`),
  
  // Create new transaction
  create: (data) => api.post('/transactions', data),
  
  // Update transaction
  update: (id, data) => api.put(`/transactions/${id}`, data),
  
  // Delete transaction
  delete: (id) => api.delete(`/transactions/${id}`),
  
  // Get filtered transactions
  getFiltered: (params) => api.get('/transactions/filter', { params }),
  
  // Get summary
  getSummary: (params) => api.get('/transactions/summary', { params }),
  
  // Get by date range
  getByDateRange: (startDate, endDate) => 
    api.get('/transactions/date-range', { params: { startDate, endDate } }),
};

export const accountAPI = {
  // Get all accounts
  getAll: () => api.get('/accounts'),
  
  // Create account
  create: (data) => api.post('/accounts', data),
  
  // Update account
  update: (id, data) => api.put(`/accounts/${id}`, data),
  
  // Delete account
  delete: (id) => api.delete(`/accounts/${id}`),
  
  // Transfer between accounts
  transfer: (data) => api.post('/accounts/transfer', data),
};

export default api;
