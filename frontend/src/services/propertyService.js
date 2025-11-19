/* eslint-disable no-unused-vars */
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

class PropertyService {
  /**
   * Get availabilities for properties using Beds24 API
   * @param {Object} params - { propId, checkIn, checkOut, numAdult, numChild }
   * @returns {Promise<Object>} API response
   */
  async getAvailabilities({
    propId,
    checkIn,
    checkOut,
    numAdult = 1,
    numChild = 0,
  }) {
    try {
      const searchParams = new URLSearchParams();
      if (propId) searchParams.append("propId", propId);
      if (checkIn) searchParams.append("checkIn", checkIn);
      if (checkOut) searchParams.append("checkOut", checkOut);
      if (numAdult) searchParams.append("numAdult", numAdult);
      if (numChild) searchParams.append("numChild", numChild);

      const response = await axios.get(
        `${API_BASE_URL}/public/availability?${searchParams.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des disponibilités :",
        error
      );
      throw new Error(
        error.response?.data?.error ||
          "Erreur lors de la récupération des disponibilités"
      );
    }
  }

  async getAllProperties() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/public/registered-properties/details`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des propriétés :", error);
      throw new Error(
        error.response?.data?.error ||
          "Erreur lors de la récupération des propriétés"
      );
    }
  }

  async getProperties() {
    try {
      const response = await axios.get(`${API_BASE_URL}/public/properties`, {});
      return response.data.getProperties || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des propriétés:", error);
      const message =
        error.response?.data?.error || "Erreur lors de la récupération";
      throw new Error(message);
    }
  }

  async getPropertyContent(propKey) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/public/property/${propKey}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du contenu de la propriété :",
        error
      );
      throw new Error(
        error.response?.data?.error ||
          "Erreur lors de la récupération du contenu de la propriété"
      );
    }
  }

  formatPropertyForDisplay(property) {
    return {
      ...property,
      displayName: property.fullName || property.name,
      shortDescription:
        property.description.length > 100
          ? `${property.description.substring(0, 100)}...`
          : property.description,
      priceFormatted: `${property.pricing.basePrice}€`,
      featuresFormatted: [
        `${property.features.maxGuests} personnes`,
        property.features.surface,
        property.features.bedConfiguration,
      ].filter(Boolean),
    };
  }

  searchProperties(properties, searchTerm) {
    if (!searchTerm) return properties;

    const term = searchTerm.toLowerCase();
    return properties.filter(
      (property) =>
        property.name.toLowerCase().includes(term) ||
        property.description.toLowerCase().includes(term) ||
        property.address.toLowerCase().includes(term) ||
        (property.subtitle && property.subtitle.toLowerCase().includes(term))
    );
  }

  filterPropertiesByPrice(properties, minPrice, maxPrice) {
    return properties.filter((property) => {
      const price = property.pricing.basePrice;
      const isAboveMin = !minPrice || price >= minPrice;
      const isBelowMax = !maxPrice || price <= maxPrice;
      return isAboveMin && isBelowMax;
    });
  }

  filterPropertiesByGuests(properties, minGuests) {
    if (!minGuests) return properties;
    return properties.filter(
      (property) => property.features.maxGuests >= minGuests
    );
  }

  sortProperties(properties, sortBy = "name") {
    const sorted = [...properties];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
      case "price-desc":
        return sorted.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
      case "guests":
        return sorted.sort(
          (a, b) => b.features.maxGuests - a.features.maxGuests
        );
      case "name":
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}

export default new PropertyService();
