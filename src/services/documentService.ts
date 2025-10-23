import axios from 'axios';
import apiConfig from '../config/api';

const api = axios.create(apiConfig);

export interface DocumentAnalysisRequest {
  document: File;
  analysisType?: string;
}

export interface DocumentAnalysisResponse {
  id: string;
  score: number;
  feedback: string;
  suggestions: string[];
  analysis: {
    structure: number;
    content: number;
    legalAccuracy: number;
    clarity: number;
  };
  timestamp: string;
}

export const documentService = {
  async analyzeDocument(data: DocumentAnalysisRequest): Promise<DocumentAnalysisResponse> {
    const formData = new FormData();
    formData.append('document', data.document);
    if (data.analysisType) {
      formData.append('analysisType', data.analysisType);
    }

    const response = await api.post('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async getAnalysisHistory(): Promise<DocumentAnalysisResponse[]> {
    const response = await api.get('/api/analyses');
    return response.data;
  },

  async getAnalysisById(id: string): Promise<DocumentAnalysisResponse> {
    const response = await api.get(`/api/analyses/${id}`);
    return response.data;
  },
};

export default documentService;
