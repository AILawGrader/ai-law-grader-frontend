import React, { useState } from 'react';
import './FirmConfiguration.scss';

interface Firm {
  name: string;
  website: string;
  practiceArea: string;
  location: string;
  keywords: string[];
}

interface FirmConfigurationProps {
  firm: Firm;
  onPracticeAreaChange: (practiceArea: string) => void;
  onKeywordToggle: (keyword: string) => void;
  onRunReport: () => void;
  onBack: () => void;
}

const SUGGESTED_KEYWORDS = [
  'Dairy Farming',
  'Milk Production',
  'Holstein Cows',
  'Sustainable Dairy Practices',
  'Regenerative Farming',
  'Animal Welfare',
  'Non-GMO Milk',
  'Dairy Processing',
  'Manure Management',
  'Dairy Education Center'
];

const FirmConfiguration: React.FC<FirmConfigurationProps> = ({
  firm,
  onPracticeAreaChange,
  onKeywordToggle,
  onRunReport,
  onBack
}) => {
  const [isEditingPracticeArea, setIsEditingPracticeArea] = useState(false);
  const [editValue, setEditValue] = useState(firm.practiceArea);
  const [customKeyword, setCustomKeyword] = useState('');

  const handlePracticeAreaSave = () => {
    onPracticeAreaChange(editValue);
    setIsEditingPracticeArea(false);
  };

  const handleAddCustomKeyword = () => {
    if (customKeyword.trim() && !firm.keywords.includes(customKeyword.trim())) {
      onKeywordToggle(customKeyword.trim());
      setCustomKeyword('');
    }
  };

  return (
    <div className="firm-configuration">
      <div className="firm-header">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <div className="firm-name-display">
          <input
            type="text"
            className="firm-name-input"
            value={firm.name}
            readOnly
          />
          <span className="status-badge status-found">
            <span className="status-icon">✓</span>
            Business Found
          </span>
        </div>
      </div>

      <div className="firm-details">
        <div className="detail-item">
          <span className="detail-label">Law firm name:</span>
          <span className="detail-value">{firm.name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Website URL:</span>
          <a href={`https://${firm.website}`} target="_blank" rel="noopener noreferrer" className="detail-link">
            {firm.website}
          </a>
        </div>
        <div className="detail-item">
          <span className="detail-label">Primary practice area:</span>
          <div className="detail-with-edit">
            {isEditingPracticeArea ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <button onClick={handlePracticeAreaSave} className="save-button">
                  Save
                </button>
                <button onClick={() => setIsEditingPracticeArea(false)} className="cancel-button">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="detail-value">{firm.practiceArea}</span>
                <button 
                  onClick={() => setIsEditingPracticeArea(true)}
                  className="edit-icon"
                  title="Edit"
                >
                  ✎
                </button>
              </>
            )}
          </div>
        </div>
        <div className="detail-item">
          <span className="detail-label">Research location:</span>
          <span className="detail-value">{firm.location}</span>
        </div>
      </div>

      <div className="keywords-section">
        <h3 className="keywords-title">
          Keywords to Analyze: We'll run AI queries for these primary keywords.
        </h3>
        
        <div className="keywords-grid">
          {SUGGESTED_KEYWORDS.map(keyword => (
            <button
              key={keyword}
              className={`keyword-pill ${firm.keywords.includes(keyword) ? 'selected' : ''}`}
              onClick={() => onKeywordToggle(keyword)}
            >
              <span className="keyword-icon">{firm.keywords.includes(keyword) ? '✓' : '+'}</span>
              {keyword}
            </button>
          ))}
          {firm.keywords.filter(k => !SUGGESTED_KEYWORDS.includes(k)).map(keyword => (
            <button
              key={keyword}
              className="keyword-pill selected"
              onClick={() => onKeywordToggle(keyword)}
            >
              <span className="keyword-icon">✓</span>
              {keyword}
            </button>
          ))}
        </div>

        <div className="add-keyword-form">
          <input
            type="text"
            className="add-keyword-input"
            placeholder="Add a keyword"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomKeyword()}
          />
          <button onClick={handleAddCustomKeyword} className="add-keyword-button">
            + Add a keyword
          </button>
        </div>
      </div>

      <div className="action-section">
        <button onClick={onRunReport} className="run-report-button">
          Run My Free AI Report &gt;
        </button>
      </div>

      <div className="features-info">
        <div className="feature-item">
          <span className="feature-icon">✓</span>
          <span>Built by GrowLaw</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🛡</span>
          <span>Trusted by law firms nationwide</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">⏱</span>
          <span>Instant Results</span>
        </div>
      </div>
    </div>
  );
};

export default FirmConfiguration;

