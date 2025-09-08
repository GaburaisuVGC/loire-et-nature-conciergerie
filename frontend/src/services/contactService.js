// src/services/contactService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ContactService {
  async sendContactMessage(contactData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/public/contact`, {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || '',
        subject: contactData.subject || 'Contact général',
        message: contactData.message,
        propertyInterest: contactData.propertyInterest || '',
        timestamp: new Date().toISOString(),
        source: 'website'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message de contact:', error);
      
      // Gestion des erreurs spécifiques
      if (error.response) {
        // Erreur de réponse du serveur
        const message = error.response.data?.error || 'Erreur lors de l\'envoi du message';
        throw new Error(message);
      } else if (error.request) {
        // Erreur de réseau
        throw new Error('Impossible de contacter le serveur. Veuillez réessayer.');
      } else {
        // Erreur de configuration
        throw new Error('Erreur lors de la préparation de la requête');
      }
    }
  }

  async validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async validatePhone(phone) {
    if (!phone) return true; // Téléphone optionnel
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
  }

  validateContactForm(formData) {
    const errors = {};

    // Validation du nom
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    if (!formData.email) {
      errors.email = 'L\'email est requis';
    } else if (!this.validateEmail(formData.email)) {
      errors.email = 'Format d\'email invalide';
    }

    // Validation du téléphone (optionnel)
    if (formData.phone && !this.validatePhone(formData.phone)) {
      errors.phone = 'Format de téléphone invalide';
    }

    // Validation du message
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default new ContactService();