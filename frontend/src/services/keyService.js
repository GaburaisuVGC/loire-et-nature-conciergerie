import axios from 'axios';
import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class KeyService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/keys`,
    });
  }

  getAuthHeaders() {
    const token = authService.getToken();
    if (!token) throw new Error('User is not authenticated');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getPropKey(propId) {
    try {
      const response = await this.api.get(`/${propId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching propKey for propId ${propId}:`, error);
      throw error;
    }
  }

  async setPropKey(propId, propKey) {
    try {
      const response = await this.api.post(
        '/',
        { propId, propKey },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error(`Error setting propKey for propId ${propId}:`, error);
      throw error;
    }
  }
}

export default new KeyService();
