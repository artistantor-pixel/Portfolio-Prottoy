import React, { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      transition: 'all 0.3s ease',
      padding: scrolled ? '1rem 0' : '2rem 0',
      background: scrolled ? 'rgba(5, 5, 10, 0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <nav className="glass-panel nav-glass" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          padding: '1rem 2rem',
          borderRadius: '9999px',
          width: 'max-content'
        }}>
          <span className="nav-brand" style={{ fontWeight: 800, marginRight: '2rem' }}>Prottoy D’Rozario</span>
          <div className="hide-on-mobile" style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
            <a href="#about" style={{ transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>About</a>
            <a href="#projects" style={{ transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>Projects</a>
            <a href="#experience" style={{ transition: 'color 0.2s', fontWeight: 500 }} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>Experience</a>
          </div>
          <a href="#contact" className="btn-primary nav-btn" style={{ padding: '0.5rem 1.25rem', marginLeft: '1rem' }}>Hire Me</a>
        </nav>
      </div>
    </header>
  );
}
