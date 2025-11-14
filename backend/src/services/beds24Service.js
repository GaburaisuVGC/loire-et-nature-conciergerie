import axios from 'axios';
import { format, addDays } from 'date-fns';

const beds24ApiClient = axios.create({
  baseURL: 'https://api.beds24.com/json',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

const getApiKey = () => {
  const apiKey = process.env.BEDS24_API_KEY;
  if (!apiKey) {
    throw new Error('Beds24 API key is not configured.');
  }
  return apiKey;
};

export class Beds24Service {
  async getProperties() {
      try {

      const payload = {
        authentication: { apiKey: getApiKey() },
      };


    const response = await beds24ApiClient.post('/getProperties', payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching properties from Beds24:', error.message);
    throw new Error('Failed to fetch properties from Beds24.');
  }
  }

  async getProperty(propKey, options = {}) {
    try {
      const response = await beds24ApiClient.post('/getProperty', {
        authentication: {
          apiKey: getApiKey(),
          propKey: propKey,
        },
        ...options,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching property from Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch property from Beds24.');
    }
  }

  async getAvailability(propKey, options = {}) {
    try {
      const { start, end } = options;
      
      const requestData = {
        authentication: {
          apiKey: getApiKey(),
          propKey: propKey,
        },
        includeRates: true,
        includeAvailability: true,
      };

      if (start) requestData.start = start;
      if (end) requestData.end = end;

      const response = await beds24ApiClient.post('/getAvailability', requestData);
      return response.data;
    } catch (error) {
      console.error('Error fetching availability from Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch availability from Beds24.');
    }
  }

  async getRates(propKey, options = {}) {
    try {
      const { start, end } = options;
      
      const requestData = {
        authentication: {
          apiKey: getApiKey(),
          propKey: propKey,
        },
      };

      if (start) requestData.start = start;
      if (end) requestData.end = end;

      const response = await beds24ApiClient.post('/getRates', requestData);
      return response.data;
    } catch (error) {
      console.error('Error fetching rates from Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch rates from Beds24.');
    }
  }

  async getBookings(propKey, options = {}) {
    try {
      const { start, end, status } = options;
      
      const requestData = {
        authentication: {
          apiKey: getApiKey(),
          propKey: propKey,
        },
      };

      if (start) requestData.start = start;
      if (end) requestData.end = end;
      if (status) requestData.status = status;

      const response = await beds24ApiClient.post('/getBookings', requestData);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings from Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch bookings from Beds24.');
    }
  }

  async createBooking(propKey, bookingData) {
    try {
      const requestData = {
        authentication: {
          apiKey: getApiKey(),
          propKey: propKey,
        },
        ...bookingData,
      };

      const response = await beds24ApiClient.post('/setBooking', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking in Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create booking in Beds24.');
    }
  }

  async getAvailabilities(params = {}) {
    try {
      const today = new Date();
      const {
        checkIn = format(today, 'yyyyMMdd'),
        checkOut = format(addDays(today, 30), 'yyyyMMdd'),
        propId,
        numAdult = 1,
        numChild = 0,
      } = params;

      if (!propId) {
        throw new Error('propId is required to check availabilities.');
      }

      const requestData = {
        authentication: { apiKey: getApiKey() },
        checkIn,
        checkOut,
        propId,
        numAdult,
        numChild,
      };

      const response = await beds24ApiClient.post('/getAvailabilities', requestData);
      return response.data;
    } catch (error) {
      console.error('Error fetching availabilities from Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch availabilities from Beds24.');
    }
  }

  async getPropertyContent(propKey) {
    try {
      if (!propKey) {
        throw new Error('propKey is required to get property content.');
      }

      const requestData = {
        authentication: {
          apiKey: getApiKey(),
          propKey,
        },
        bookingData: true,
        images: true,
        roomIds: true,
        texts: true,
        includeAirbnb: true,
        includeVrbo: true,
      };

      const response = await beds24ApiClient.post('/getPropertyContent', requestData);
      return response.data;
    } catch (error) {
      console.error('Error fetching property content from Beds24:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch property content from Beds24.');
    }
  }
}