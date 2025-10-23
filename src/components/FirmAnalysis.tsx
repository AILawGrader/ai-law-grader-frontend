import React, { useState, useEffect } from 'react';
import analysisService, { AnalysisRequest, AnalysisResponse } from '../services/analysisService';
import './FirmAnalysis.scss';

const FirmAnalysis: React.FC = () => {
  const [formData, setFormData] = useState<AnalysisRequest>({
    firmUrl: '',
    firmName: '',
    email: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firmUrl || !formData.firmName || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analysisService.createAnalysis(formData);
      setJobId(result.jobId);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to start analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const checkAnalysisStatus = async () => {
    if (!jobId) return;

    try {
      const result = await analysisService.getAnalysis(jobId);
      setAnalysis(result);
      
      if (result.status === 'completed' || result.status === 'failed') {
        return;
      }
    } catch (err: any) {
      setError('Failed to check analysis status');
    }
  };

  useEffect(() => {
    if (jobId && analysis?.status === 'processing') {
      const interval = setInterval(checkAnalysisStatus, 2000);
      return () => clearInterval(interval);
    }
  }, [jobId, analysis?.status]);

  const resetForm = () => {
    setFormData({ firmUrl: '', firmName: '', email: '' });
    setAnalysis(null);
    setError(null);
    setJobId(null);
  };

  return (
    <div className="firm-analysis">
      <div className="analysis-container">
        <h2>Law Firm Website Analysis</h2>
        
        <form onSubmit={handleSubmit} className="analysis-form">
          <div className="form-group">
            <label htmlFor="firmUrl">Firm Website URL</label>
            <input
              type="url"
              id="firmUrl"
              name="firmUrl"
              value={formData.firmUrl}
              onChange={handleInputChange}
              placeholder="https://example-law-firm.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="firmName">Firm Name</label>
            <input
              type="text"
              id="firmName"
              name="firmName"
              value={formData.firmName}
              onChange={handleInputChange}
              placeholder="Example Law Firm"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="user@example.com"
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isAnalyzing}
              className="btn btn-primary"
            >
              {isAnalyzing ? 'Starting Analysis...' : 'Start Analysis'}
            </button>
            
            {(analysis || error) && (
              <button 
                type="button" 
                onClick={resetForm}
                className="btn btn-secondary"
              >
                New Analysis
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {analysis && (
          <div className="analysis-result">
            <h3>Analysis Status</h3>
            <div className="status-display">
              <span className={`status-badge status-${analysis.status}`}>
                {analysis.status.charAt(0).toUpperCase() + analysis.status.slice(1)}
              </span>
              <span className="job-id">Job ID: {analysis.jobId}</span>
            </div>

            {analysis.status === 'processing' && (
              <div className="processing-message">
                <p>Analysis in progress... This may take a few minutes.</p>
              </div>
            )}

            {analysis.status === 'completed' && analysis.results && (
              <div className="results-section">
                <div className="score-display">
                  <div className="overall-score">
                    <span className="score-label">Overall Score:</span>
                    <span className="score-value">{analysis.results.score}/100</span>
                  </div>
                </div>
                
                <div className="detailed-scores">
                  <h4>Detailed Breakdown</h4>
                  <div className="scores-grid">
                    <div className="score-item">
                      <span>Website Quality:</span>
                      <span>{analysis.results.analysis.websiteQuality}/100</span>
                    </div>
                    <div className="score-item">
                      <span>Content Relevance:</span>
                      <span>{analysis.results.analysis.contentRelevance}/100</span>
                    </div>
                    <div className="score-item">
                      <span>User Experience:</span>
                      <span>{analysis.results.analysis.userExperience}/100</span>
                    </div>
                    <div className="score-item">
                      <span>Legal Compliance:</span>
                      <span>{analysis.results.analysis.legalCompliance}/100</span>
                    </div>
                  </div>
                </div>

                <div className="feedback-section">
                  <h4>Analysis Feedback</h4>
                  <p className="feedback-text">{analysis.results.feedback}</p>
                </div>

                {analysis.results.suggestions.length > 0 && (
                  <div className="suggestions-section">
                    <h4>Recommendations</h4>
                    <ul className="suggestions-list">
                      {analysis.results.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {analysis.status === 'failed' && (
              <div className="error-message">
                <p>Analysis failed. Please try again.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirmAnalysis;
