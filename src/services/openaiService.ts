import axios from 'axios';
import apiConfig from '../config/api';

const api = axios.create(apiConfig);

export interface OpenAISearchRequest {
  message: string;
  model?: string;
  temperature?: number;
}

export interface OpenAISearchResponse {
  result?: string;
  error?: string;
}

export const openaiService = {
  async search(message: string, model: string = 'gpt-4o-mini', temperature: number = 0.7): Promise<OpenAISearchResponse> {
    try {
      const response = await api.post('/api/openai/search', {
        message,
        model,
        temperature
      });
      return response.data;
    } catch (error: any) {
      console.error('OpenAI search error:', error);
      throw new Error(error.response?.data?.error || 'Failed to search with OpenAI');
    }
  },
};

export default openaiService;

