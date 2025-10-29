import React, { useState } from 'react';
import aiRankingService, { AIRankingResponse, PlatformResult } from '../../services/aiRankingService';
import './LawFirmSearch.scss';

const LawFirmSearch: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AIRankingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    business: 'MVP Law Firm',
    location: 'United States',
    keywords: 'personal injury, family law',
    industry: 'legal services',
    url: 'https://themvp.com',
    city: 'San Francisco, California'
  } );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await aiRankingService.comprehensiveCheck({
        business: formData.business,
        location: formData.location,
        keywords: formData.keywords,
        industry: formData.industry,
        url: formData.url,
        city: formData.city
      });
      setResults(response);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="law-firm-search">
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">
            See if ChatGPT, Gemini, and Perplexity recommend your law firm
          </h1>
          <p className="search-subtitle">
            Check how your firm appears across ChatGPT, Claude, Gemini, Perplexity & Google AI
          </p>
        </div>

        <div className="search-card">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  placeholder="e.g., Law Firm Name"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., United States"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, California"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g., personal injury, family law"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., legal services"
                  className="form-input"
                />
              </div>

              <div className="form-group form-group-full">
                <label className="form-label">
                  Website URL (optional)
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="e.g., https://yourwebsite.com"
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="search-button"
            >
              {loading ? (
                <span className="button-loading">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Checking AI platforms...
                </span>
              ) : (
                'Check AI Visibility'
              )}
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {results && (
          <>
            <div className="summary-cards">
              <SummaryCard
                title="Visibility Score"
                value={`${results?.summary?.visibilityScore}%`}
                subtitle={`Grade: ${results?.summary?.grade || 'N/A'}`}
                color="blue"
              />
              <SummaryCard
                title="Platforms"
                value={`${results?.summary?.visibleOn}/${results?.summary?.totalPlatforms}`}
                subtitle="Visible on"
                color="green"
              />
              <SummaryCard
                title="Avg Position"
                value={results?.summary?.averagePosition?.toString() || 'N/A'}
                subtitle="When visible"
                color="purple"
              />
              <SummaryCard
                title="Not Visible"
                value={results?.summary?.notVisibleOn?.toString() || 'N/A'}
                subtitle="Platforms"
                color="orange"
              />
            </div>

            <div className="platform-section">
              <h2 className="section-title">Platform Results</h2>
              <div className="platforms-grid">
                {Object.entries(results?.platforms || {}).map(([key, platform]) => (
                  <PlatformCard key={key} platform={platform} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}> = ({ title, value, subtitle, color }) => {
  return (
    <div className={`summary-card summary-card-${color}`}>
      <h3 className="summary-card-title">{title}</h3>
      <p className="summary-card-value">{value}</p>
      <p className="summary-card-subtitle">{subtitle}</p>
    </div>
  );
};

const PlatformCard: React.FC<{ platform: PlatformResult }> = ({ platform }) => {
  const getStatusColor = () => {
    if (platform.error) return 'platform-error';
    if (platform.isVisible) return 'platform-success';
    return 'platform-neutral';
  };

  return (
    <div className={`platform-card ${getStatusColor()}`}>
      <div className="platform-header">
        <h3 className="platform-name">{platform.platform}</h3>
        {platform.isVisible ? (
          <span className="platform-status platform-status-success">✓</span>
        ) : (
          <span className="platform-status platform-status-fail">✗</span>
        )}
      </div>

      {platform.error ? (
        <p className="platform-error-text">Error: {platform.error}</p>
      ) : (
        <div className="platform-details">
          <div className="platform-detail-row">
            <span className="platform-detail-label">Status:</span>
            <span className={`platform-detail-value ${platform.isVisible ? 'text-success' : 'text-muted'}`}>
              {platform.isVisible ? 'Visible' : 'Not Visible'}
            </span>
          </div>

          {platform.rank && (
            <div className="platform-detail-row">
              <span className="platform-detail-label">Rank:</span>
              <span className="platform-detail-value">#{platform.rank}</span>
            </div>
          )}

          {platform.url && (
            <div className="platform-detail-row">
              <a href={platform.url} target="_blank" rel="noopener noreferrer" className="platform-link">
                View Result
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LawFirmSearch;

