import React from 'react';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">AI Law Grader</h1>
          <p className="hero-subtitle">
            Intelligent legal document analysis and grading system
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        
        <div className="features">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="features-grid">
            <div className="card">
              <h3>Document Analysis</h3>
              <p>Advanced AI-powered analysis of legal documents</p>
            </div>
            <div className="card">
              <h3>Automated Grading</h3>
              <p>Consistent and objective grading of legal submissions</p>
            </div>
            <div className="card">
              <h3>Detailed Feedback</h3>
              <p>Comprehensive feedback and improvement suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
