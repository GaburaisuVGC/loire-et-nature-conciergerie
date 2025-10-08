import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class TestimonialService {
  // Public: Get all approved testimonials
  async getPublicTestimonials() {
    try {
      const response = await axios.get(`${API_BASE_URL}/public/testimonials`);
      return response.data.testimonials;
    } catch (error) {
      console.error('Error fetching public testimonials:', error);
      throw error;
    }
  }

  // Public: Get top rated testimonials (for home page)
  async getTopTestimonials(limit = 3) {
    try {
      const response = await axios.get(`${API_BASE_URL}/public/testimonials/top`, {
        params: { limit }
      });
      return response.data.testimonials;
    } catch (error) {
      console.error('Error fetching top testimonials:', error);
      throw error;
    }
  }

  // Public: Submit a new testimonial
  async createTestimonial(testimonialData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/public/testimonials`, testimonialData);
      return response.data;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  }

  // Admin: Get all testimonials (approved and pending)
  async getAllTestimonials() {
    try {
      const response = await axios.get(`${API_BASE_URL}/testimonials`);
      return response.data.testimonials;
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
      throw error;
    }
  }

  // Admin: Approve a testimonial
  async approveTestimonial(id) {
    try {
      const response = await axios.put(`${API_BASE_URL}/testimonials/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error('Error approving testimonial:', error);
      throw error;
    }
  }

  // Admin: Delete a testimonial
  async deleteTestimonial(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/testimonials/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  }
}

export default new TestimonialService();