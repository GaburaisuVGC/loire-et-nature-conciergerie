/* eslint-disable no-unused-vars */
import axios from 'axios';
import { mockProperties, generateMockCalendarData } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class PropertyService {
  async getPublicProperties() {
    try {
      // Essayer d'abord l'API
      const response = await axios.get(`${API_BASE_URL}/public/properties`);
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données mockées');
      // Fallback vers les données mockées
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockProperties);
        }, 500); // Simulation de latence réseau
      });
    }
  }

  async getPublicProperty(id) {
    try {
      // Essayer d'abord l'API
      const response = await axios.get(`${API_BASE_URL}/public/properties/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API non disponible, utilisation des données mockées');
      // Fallback vers les données mockées
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const property = mockProperties.find(p => p.id === id);
          if (property) {
            resolve(property);
          } else {
            reject(new Error('Propriété non trouvée'));
          }
        }, 300);
      });
    }
  }

  async getPropertyAvailability(id, start, end) {
    try {
      // Essayer d'abord l'API
      const params = new URLSearchParams();
      if (start) params.append('start', start);
      if (end) params.append('end', end);

      const response = await axios.get(
        `${API_BASE_URL}/public/properties/${id}/availability?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.warn('API non disponible, génération de données mockées de disponibilité');
      // Fallback vers les données mockées
      return new Promise((resolve) => {
        setTimeout(() => {
          const startDate = start ? new Date(start) : new Date();
          const availability = generateMockCalendarData(startDate);
          
          resolve({
            propertyId: id,
            period: { 
              start: start || new Date().toISOString().split('T')[0], 
              end: end || new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            availability,
            lastUpdated: new Date().toISOString(),
            source: 'mock'
          });
        }, 800);
      });
    }
  }

  // Méthodes admin (nécessitent authentification)
  async getProperties() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/properties`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des propriétés:', error);
      const message = error.response?.data?.error || 'Erreur lors de la récupération';
      throw new Error(message);
    }
  }

  async getProperty(id) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/properties/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la propriété:', error);
      const message = error.response?.data?.error || 'Erreur lors de la récupération';
      throw new Error(message);
    }
  }

  async createProperty(propertyData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la propriété:', error);
      const message = error.response?.data?.error || 'Erreur lors de la création';
      throw new Error(message);
    }
  }

  async updateProperty(id, propertyData) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`${API_BASE_URL}/properties/${id}`, propertyData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la propriété:', error);
      const message = error.response?.data?.error || 'Erreur lors de la mise à jour';
      throw new Error(message);
    }
  }

  async deleteProperty(id) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(`${API_BASE_URL}/properties/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la propriété:', error);
      const message = error.response?.data?.error || 'Erreur lors de la suppression';
      throw new Error(message);
    }
  }

  async getBeds24Availability(id, start, end) {
    try {
      const token = localStorage.getItem('authToken');
      const params = new URLSearchParams();
      if (start) params.append('start', start);
      if (end) params.append('end', end);

      const response = await axios.get(
        `${API_BASE_URL}/properties/${id}/beds24-availability?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des disponibilités Beds24:', error);
      throw new Error('Impossible de récupérer les disponibilités Beds24');
    }
  }

  // Méthodes utilitaires
  formatPropertyForDisplay(property) {
    return {
      ...property,
      displayName: property.fullName || property.name,
      shortDescription: property.description.length > 100 
        ? `${property.description.substring(0, 100)}...` 
        : property.description,
      priceFormatted: `${property.pricing.basePrice}€`,
      featuresFormatted: [
        `${property.features.maxGuests} personnes`,
        property.features.surface,
        property.features.bedConfiguration
      ].filter(Boolean)
    };
  }

  searchProperties(properties, searchTerm) {
    if (!searchTerm) return properties;
    
    const term = searchTerm.toLowerCase();
    return properties.filter(property =>
      property.name.toLowerCase().includes(term) ||
      property.description.toLowerCase().includes(term) ||
      property.address.toLowerCase().includes(term) ||
      (property.subtitle && property.subtitle.toLowerCase().includes(term))
    );
  }

  filterPropertiesByPrice(properties, minPrice, maxPrice) {
    return properties.filter(property => {
      const price = property.pricing.basePrice;
      const isAboveMin = !minPrice || price >= minPrice;
      const isBelowMax = !maxPrice || price <= maxPrice;
      return isAboveMin && isBelowMax;
    });
  }

  filterPropertiesByGuests(properties, minGuests) {
    if (!minGuests) return properties;
    return properties.filter(property => 
      property.features.maxGuests >= minGuests
    );
  }

  sortProperties(properties, sortBy = 'name') {
    const sorted = [...properties];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
      case 'guests':
        return sorted.sort((a, b) => b.features.maxGuests - a.features.maxGuests);
      case 'name':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}

export default new PropertyService();