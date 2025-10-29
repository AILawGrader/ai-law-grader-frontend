import axios from 'axios';
import apiConfig from '../config/api';

const api = axios.create(apiConfig);

export interface AIRankingRequest {
  businessName: string;
  keywords?: string;
  location: string;
}

export interface ComprehensiveCheckRequest {
  business: string;
  keywords?: string;
  location: string;
  industry?: string;
  url?: string;
  city?: string;
}

export interface PlatformResult {
  platform: string;
  error?: string;
  isVisible: boolean;
  rank?: number;
  url?: string;
}

export interface AIRankingSummary {
  totalPlatforms: number;
  visibleOn: number;
  notVisibleOn: number;
  visibilityScore: number;
  averagePosition: number | null;
  grade: string;
}

export interface AIRankingResponse {
  success?: boolean;
  businessName?: string;
  query?: string;
  platforms?: {
    [key: string]: PlatformResult;
  };
  summary?: AIRankingSummary;
  timestamp?: string;
}

export const aiRankingService = {
  async checkAIRanking(data: AIRankingRequest): Promise<AIRankingResponse> {
    const response = await api.post('/api/check-ai-ranking', data);
    return response.data;
  },

  async comprehensiveCheck(data: ComprehensiveCheckRequest): Promise<AIRankingResponse> {
    const response = await api.post('/api/comprehensive-check', data);
    return response.data;
  },

  async testCheck(data: ComprehensiveCheckRequest): Promise<AIRankingResponse> {
    const response = await api.post('/api/test', {
      business: data.business,
      keywords: data.keywords,
      location: data.location,
      city: data.city
    });
    return response.data;
  },
};

export default aiRankingService;
