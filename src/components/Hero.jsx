import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Target, TrendingUp } from 'lucide-react';
import prottoyPhoto from '../assets/prottoy-photo.jpg';

export default function Hero() {
  const [profile, setProfile] = useState({ heroText: 'Loading...' });

  useEffect(() => {
    fetch('http://localhost:3000/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="section container animate-fade-up" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="grid-2 mobile-reverse" style={{ width: '100%', alignItems: 'center', marginTop: '6rem', marginBottom: '2rem' }}>
        
        {/* Left Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="delay-100 animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '0.5rem 1rem', borderRadius: '9999px', width: 'fit-content' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-2)', boxShadow: '0 0 10px var(--accent-2)' }}></span>
            <span style={{ color: 'var(--accent-2)', fontSize: '0.875rem', fontWeight: 600 }}>Available for new projects</span>
          </div>

          <h1 className="text-huge" style={{ lineHeight: '1' }}>
            <span style={{ display: 'block' }}>DIGITAL</span>
            <span className="text-gradient">MARKETING</span>
            <span style={{ display: 'block' }}>PORTFOLIO</span>
          </h1>
          
          <p className="text-body-large delay-200 animate-fade-up" style={{ maxWidth: '600px', color: 'var(--text-muted)' }}>
            {profile.heroText}
          </p>

          <div className="hero-buttons delay-300 animate-fade-up" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-primary">
              Let's Talk <ArrowRight size={18} />
            </a>
            <button className="btn-glass">
              Download CV <Download size={18} />
            </button>
          </div>
        </div>

        {/* Right Content - Glass Image Placeholder */}
        <div className="delay-400 animate-fade-up" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          
          {/* Floating Badges */}
          <div className="glass-card badge-top-left" style={{ position: 'absolute', top: '10%', left: '-5%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 10, animation: 'float 6s infinite ease-in-out reverse' }}>
            <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '0.5rem', borderRadius: '12px', color: 'var(--accent-3)' }}>
              <Target size={24} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>High ROAS</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Targeted Ads</p>
            </div>
          </div>

          <div className="glass-card badge-bottom-right" style={{ position: 'absolute', bottom: '15%', right: '-2%', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 10, animation: 'float 8s infinite ease-in-out' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '0.5rem', borderRadius: '12px', color: 'var(--accent-2)' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>10k+ Leads</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Generated</p>
            </div>
          </div>

          {/* Main Photo Container */}
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '450px',
            aspectRatio: '4/5',
            padding: '1rem',
            position: 'relative'
          }}>
            <img 
              src={prottoyPhoto} 
              alt="Emmanuel Prottoy D'Rozario" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '16px'
              }}
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
