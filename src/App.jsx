import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import API_URL from './config';

function App() {
  useEffect(() => {
    // Fetch Site Settings (Colors, SEO, Title)
    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(settings => {
        document.title = settings.siteTitle || "Prottoy | Portfolio";
        if (settings.primaryColor) {
          document.documentElement.style.setProperty('--accent-1', settings.primaryColor);
        }
        if (settings.secondaryColor) {
          document.documentElement.style.setProperty('--accent-2', settings.secondaryColor);
        }
      });
  }, []);

  return (
    <>
      <div className="mesh-gradient"></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<PublicPortfolio />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
