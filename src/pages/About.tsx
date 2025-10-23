import React from 'react';
import './About.scss';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-content">
          <h1 className="about-title">About AI Law Grader</h1>
          <div className="about-text">
            <p>
              AI Law Grader is an innovative platform that leverages artificial intelligence 
              to analyze and grade legal documents with unprecedented accuracy and consistency.
            </p>
            <p>
              Our system combines advanced natural language processing with legal expertise 
              to provide comprehensive feedback and objective assessment of legal submissions.
            </p>
            <p>
              Whether you're a law student, legal professional, or educator, our platform 
              helps streamline the grading process while maintaining the highest standards 
              of legal analysis.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <h3>99.9%</h3>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-card">
              <h3>10,000+</h3>
              <p>Documents Analyzed</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
