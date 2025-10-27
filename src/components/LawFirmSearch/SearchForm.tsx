import React, { useState } from 'react';
import './SearchForm.scss';

interface SearchFormProps {
  onSearch: (query: string, location?: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!query.trim()) return;

    console.log('query', query);
    console.log('location', location);

    setIsSearching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSearch(query, location);
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
            // required
          />
          <button type="button" className="help-icon" title="Help">
            ?
          </button>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="City (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
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

