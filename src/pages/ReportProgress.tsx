import React, { useState, useEffect } from 'react';
import './ReportProgress.scss';

interface ProgressStep {
  id: number;
  name: string;
  description: string;
  progress: number;
  completed: boolean;
}

const ReportProgress: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: ''
  });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [steps] = useState<ProgressStep[]>([
    {
      id: 1,
      name: 'Website Analysis',
      description: 'Identifying your practice areas and keywords from your website.',
      progress: 100,
      completed: true
    },
    {
      id: 2,
      name: 'AI Testing',
      description: 'Checking if AI assistants (ChatGPT, Perplexity, Gemini) recommend your firm.',
      progress: 100,
      completed: true
    },
    {
      id: 3,
      name: 'Competitor Research',
      description: 'Comparing how often you show up versus other firms in your area.',
      progress: 100,
      completed: true
    },
    {
      id: 4,
      name: 'Report Generation',
      description: 'Building your AI Visibility Score, competitor breakdown, and action steps.',
      progress: 60,
      completed: false
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="report-progress-page">
      <div className="report-progress-header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-square">GROW LAW</div>
          </div>
          <div className="firm-info">
            <div className="firm-name">Law Firm AI Grader Assessment</div>
            <div className="law-firm-name">Your Law Firm</div>
          </div>
        </div>
        <div className="header-right">
          <div className="phone-number">(312) 598 1292</div>
          <button className="consult-button">Request Consultation</button>
        </div>
      </div>

      <div className="report-progress-content">
        <div className="progress-header">
          <h1 className="progress-title">We're Generating Your AI Visibility Report</h1>
          <p className="progress-subtitle">Your personalized analysis will be ready in about 2-4 minutes.</p>
        </div>

        <div className="progress-container">
          <div className="progress-left">
            <div className="contact-section">
              <h2 className="section-title">Almost Ready - Just One More Step</h2>
              <p className="section-description">
                Once the analysis is complete, you'll see your personalized AI Visibility Report instantly. 
                We'll also email you a copy for easy reference.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    placeholder="Enter your first name."
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    placeholder="Enter your last name."
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessEmail" className="form-label">Business Email*</label>
                  <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    className="form-input"
                    placeholder="Enter your business email address."
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Submit Contact Info &gt;
                </button>

                <p className="form-note">
                  <span className="lock-icon">🔒</span>
                  Your information is secure. We'll only use it to deliver your report; no spam, ever.
                </p>
              </form>
            </div>
          </div>

          <div className="progress-right">
            <div className="tip-section">
              <div className="tip-icon">💡</div>
              <span className="tip-text">Video ads and educational content help AI recognize your firm.</span>
              <span className="video-icon">📹</span>
            </div>
            <div className="timer">{formatTime(timeElapsed)}</div>

            <div className="analysis-progress">
              <h3 className="progress-section-title">Analysis Progress</h3>
              {steps.map((step) => (
                <div key={step.id} className="progress-step">
                  <div className="step-header">
                    {step.completed ? (
                      <span className="check-icon">✓</span>
                    ) : (
                      <span className="step-number">{step.id}</span>
                    )}
                    <div className="step-info">
                      <span className="step-name">{step.name}</span>
                      <span className="step-percentage">{step.progress}%</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${step.progress}%` }}
                    ></div>
                  </div>
                  <p className="step-description">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProgress;

