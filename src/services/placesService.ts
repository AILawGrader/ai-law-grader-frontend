import axios from 'axios';
import apiConfig from '../config/api';

const api = axios.create(apiConfig);

export interface Place {
  placeId: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  googleMapsUrl: string;
  website: string;
  phoneNumber: string;
  types: string[];
  osmType?: string;
  osmId?: number;
}

export interface CitySearchResult {
  placeId: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  type: string;
  class: string;
}

export interface SearchResponse {
  results: Place[];
  totalResults: number;
}

export interface CitySearchResponse {
  results: CitySearchResult[];
  totalResults: number;
}

export const placesService = {
  async searchLawFirms(query: string, location?: string, radius?: number): Promise<SearchResponse> {
    const params: any = { query };
    if (location) {
      params.location = location;
    }
    if (radius) {
      params.radius = radius;
    }
    
    const response = await api.get('/api/places-test/search', { params });
    return response.data;
  },

  async searchCity(city: string): Promise<CitySearchResponse> {
    const response = await api.get('/api/places/city', { 
      params: { city } 
    });
    return response.data;
  },

  async getPlaceDetails(placeId: string): Promise<Place> {
    const response = await api.get(`/api/places/${placeId}`);
    return response.data;
  },
};

export default placesService;
