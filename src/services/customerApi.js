import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const customerApi = {
  /**
   * GET /api/customers
   * @returns {Promise<Customer[]>}
   */
  getAll: () => api.get('/api/customers').then((res) => res.data),

  /**
   * GET /api/customers/:id
   * @param {number} id
   * @returns {Promise<Customer>}
   */
  getById: (id) => api.get(`/api/customers/${id}`).then((res) => res.data),

  /**
   * POST /api/customers
   * @param {{ name: string, email: string, status: string }} payload
   * @returns {Promise<Customer>}
   */
  create: (payload) => api.post('/api/customers', payload).then((res) => res.data),

  /**
   * PUT /api/customers/:id
   * @param {number} id
   * @param {{ name: string, email: string }} payload
   * @returns {Promise<Customer>}
   */
  update: (id, payload) => api.put(`/api/customers/${id}`, payload).then((res) => res.data),
};

export default customerApi;
