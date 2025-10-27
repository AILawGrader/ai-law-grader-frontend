import React, { useState } from 'react';
import SearchForm from './SearchForm';
import FirmConfiguration from './FirmConfiguration';
import './LawFirmSearch.scss';

interface Firm {
  name: string;
  website: string;
  practiceArea: string;
  location: string;
  keywords: string[];
}

const LawFirmSearch: React.FC = () => {
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);

  const handleSearch = async (query: string) => {
    
    // TODO: Replace with actual API call
    // For now, simulate search result
    const mockFirm: Firm = {
      name: query,
      website: `${query.toLowerCase().replace(/\s+/g, '')}.com`,
      practiceArea: 'General Practice',
      location: 'New York, NY',
      keywords: []
    };
    
    setSelectedFirm(mockFirm);
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

  const handleRunReport = () => {
    console.log('Running report for:', selectedFirm);
    // TODO: Navigate to results page or trigger analysis
  };

  const handleBack = () => {
    setSelectedFirm(null);
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
          {!selectedFirm ? (
            <SearchForm onSearch={handleSearch} />
          ) : (
            <FirmConfiguration
              firm={selectedFirm}
              onPracticeAreaChange={handlePracticeAreaChange}
              onKeywordToggle={handleKeywordToggle}
              onRunReport={handleRunReport}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LawFirmSearch;

