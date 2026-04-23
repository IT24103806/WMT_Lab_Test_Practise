import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

console.log('[api] VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('[api] Using API base URL:', API_BASE_URL);

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const getItems = () => {
  console.log('[api] Sending GET /items');
  return API.get('/items');
};

export const createItem = (data) => {
  console.log('[api] Sending POST /items with data:', data);
  return API.post('/items', data);
};

export const deleteItem = (id) => {
  console.log('[api] Sending DELETE /items/' + id);
  return API.delete(`/items/${id}`);
};

export const updateItem = (id, data) => {
  console.log('[api] Sending PUT /items/' + id, data);
  return API.put(`/items/${id}`, data);
};
