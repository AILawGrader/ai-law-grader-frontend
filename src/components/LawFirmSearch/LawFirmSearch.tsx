import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm.tsx';
import FirmConfiguration from './FirmConfiguration.tsx';
import { placesService, Place } from '../../services/placesService';
import openaiService from '../../services/openaiService';
import './LawFirmSearch.scss';

interface Firm {
  placeId: string;
  name: string;
  website: string;
  practiceArea: string;
  location: string;
  keywords: string[];
}

interface SearchResults {
  results: Place[];
  totalResults: number;
}

const LawFirmSearch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string, location?: string) => {
    setError(null);
    
    try {
      const response = await placesService.searchLawFirms(
        query,
        location,
        5000
      );
      
      setSearchResults(response);
      
      if (response.results.length === 0) {
        setError('No law firms found. Please try a different search.');
      }
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.response?.data?.error || 'Failed to search for law firms');
    }
  };

  const handleSelectFirm = (place: Place) => {
    const firm: Firm = {
      placeId: place.placeId,
      name: place.name,
      website: place.website || '',
      practiceArea: 'General Practice',
      location: place.address || '',
      keywords: []
    };
    
    setSelectedFirm(firm);
    setSearchResults(null);
  };

  const handlePracticeAreaChange = (practiceArea: string) => {
    if (selectedFirm) {
      setSelectedFirm({ ...selectedFirm, practiceArea });
    }
  };

  const handleKeywordToggle = (keyword: string) => {
    if (!selectedFirm) return;
    
    const keywords = selectedFirm.keywords.includes(keyword)
      ? selectedFirm.keywords.filter(k => k !== keyword)
      : [...selectedFirm.keywords, keyword];
    
    setSelectedFirm({ ...selectedFirm, keywords });
  };

  const handleRunReport = async () => {
    console.log('Running report for:', selectedFirm);
    
    if (selectedFirm) {
      const message = `Search for law firms that match the following criteria:
- Name: ${selectedFirm.name}
- Location: ${selectedFirm.location}
- Practice Area: ${selectedFirm.practiceArea}
- Keywords: ${selectedFirm.keywords.join(', ')}
- Website: ${selectedFirm.website}`;

      try {
        const response = await openaiService.search(message);
        console.log('OpenAI search result:', response);
      } catch (error) {
        console.error('Error sending to OpenAI:', error);
      }
    }
    
    navigate('/report-progress');
  };

  const handleBack = () => {
    setSelectedFirm(null);
  };

  const handleBackToSearch = () => {
    setSearchResults(null);
  };

  return (
    <div className="law-firm-search">
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">
            See if ChatGPT, Gemini, and Perplexity recommend your law firm
          </h1>
        </div>

        <div className="search-card">
          {!selectedFirm && !searchResults ? (
            <>
              <SearchForm onSearch={handleSearch} />
              {error && <div className="error-message">{error}</div>}
            </>
          ) : selectedFirm ? (
            <FirmConfiguration
              firm={selectedFirm}
              onPracticeAreaChange={handlePracticeAreaChange}
              onKeywordToggle={handleKeywordToggle}
              onRunReport={handleRunReport}
              onBack={handleBack}
            />
          ) : searchResults ? (
            <div className="search-results">
              <button onClick={handleBackToSearch} className="back-button">
                ← Back to Search
              </button>
              <h2>Select Your Law Firm</h2>
              {error && <div className="error-message">{error}</div>}
              {searchResults.results.length > 0 && (
                <div className="results-list">
                  {searchResults.results.map((place) => (
                    <div
                      key={place.placeId}
                      className="result-item"
                      onClick={() => handleSelectFirm(place)}
                    >
                      <div className="result-name">{place.name}</div>
                      <div className="result-address">{place.address}</div>
                      {place.phoneNumber && (
                        <div className="result-phone">{place.phoneNumber}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LawFirmSearch;

