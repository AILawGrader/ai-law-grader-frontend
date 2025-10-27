import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ReportProgress from '@/pages/ReportProgress';
import './styles/global.scss';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/report-progress';

  return (
    <div className={`app ${location.pathname === '/report-progress' ? 'full-page' : ''}`}>
      {showHeader && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/report-progress" element={<ReportProgress />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
