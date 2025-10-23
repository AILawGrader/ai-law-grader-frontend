import React, { useState } from 'react';
import documentService, { DocumentAnalysisRequest, DocumentAnalysisResponse } from '../services/documentService';
import './DocumentUpload.scss';

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<DocumentAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const request: DocumentAnalysisRequest = {
        document: file,
        analysisType: 'comprehensive'
      };
      
      const analysisResult = await documentService.analyzeDocument(request);
      setResult(analysisResult);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze document');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="document-upload">
      <div className="upload-container">
        <h2>Upload Document for Analysis</h2>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-container">
            <input
              type="file"
              id="document"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="document" className="file-label">
              {file ? file.name : 'Choose Document'}
            </label>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={!file || isUploading}
              className="btn btn-primary"
            >
              {isUploading ? 'Analyzing...' : 'Analyze Document'}
            </button>
            
            {(file || result) && (
              <button 
                type="button" 
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="analysis-result">
            <h3>Analysis Results</h3>
            <div className="score-display">
              <div className="overall-score">
                <span className="score-label">Overall Score:</span>
                <span className="score-value">{result.score}/100</span>
              </div>
            </div>
            
            <div className="detailed-scores">
              <h4>Detailed Breakdown</h4>
              <div className="scores-grid">
                <div className="score-item">
                  <span>Structure:</span>
                  <span>{result.analysis.structure}/100</span>
                </div>
                <div className="score-item">
                  <span>Content:</span>
                  <span>{result.analysis.content}/100</span>
                </div>
                <div className="score-item">
                  <span>Legal Accuracy:</span>
                  <span>{result.analysis.legalAccuracy}/100</span>
                </div>
                <div className="score-item">
                  <span>Clarity:</span>
                  <span>{result.analysis.clarity}/100</span>
                </div>
              </div>
            </div>

            <div className="feedback-section">
              <h4>Feedback</h4>
              <p className="feedback-text">{result.feedback}</p>
            </div>

            {result.suggestions.length > 0 && (
              <div className="suggestions-section">
                <h4>Suggestions for Improvement</h4>
                <ul className="suggestions-list">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
