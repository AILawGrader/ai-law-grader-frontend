import React, { useState } from 'react';
import './SearchForm.scss';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSearch(query);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Enter your law firm name *"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="button" className="help-icon" title="Help">
            ?
          </button>
        </div>
        <button 
          type="submit" 
          className="search-button"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

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
    </>
  );
};

export default SearchForm;

