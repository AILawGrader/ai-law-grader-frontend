import axios from 'axios';
import apiConfig from '../config/api';

const api = axios.create(apiConfig);

export interface AnalysisRequest {
  firmUrl: string;
  firmName: string;
  email: string;
}

export interface AnalysisResponse {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  firmUrl: string;
  firmName: string;
  email: string;
  createdAt: string;
  completedAt?: string;
  results?: {
    score: number;
    analysis: {
      websiteQuality: number;
      contentRelevance: number;
      userExperience: number;
      legalCompliance: number;
    };
    feedback: string;
    suggestions: string[];
  };
}

export const analysisService = {
  async createAnalysis(data: AnalysisRequest): Promise<AnalysisResponse> {
    const response = await api.post('/api/analysis', data);
    return response.data;
  },

  async getAnalysis(jobId: string): Promise<AnalysisResponse> {
    const response = await api.get(`/api/analysis/${jobId}`);
    return response.data;
  },
};

export default analysisService;
