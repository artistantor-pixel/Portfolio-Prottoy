import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function About() {
  const [profile, setProfile] = useState({ aboutText: 'Loading...' });

  useEffect(() => {
    fetch(`${API_URL}/api/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <section id="about" className="section container">
      <div className="grid-2" style={{ gap: '3rem' }}>
        
        {/* Intro Card */}
        <div className="glass-card animate-fade-up" style={{ padding: '3rem' }}>
          <h2 className="text-huge" style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
            HELLO, I'M<br />
            <span className="text-gradient">EMMANUEL</span><br />
            PROTTOY<br />
            D’ROZARIO!
          </h2>
          <p className="text-body-large" style={{ color: 'var(--text-muted)' }}>
            {profile.aboutText}
          </p>
        </div>

        {/* Vision & Mission Card */}
        <div className="glass-card animate-fade-up delay-200" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 className="text-huge" style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
            VISION &<br />
            MISSION<br />
            OF MY<br />
            LIFE.
          </h2>
          <p className="text-body-large" style={{ color: 'var(--text-muted)' }}>
            My vision is to grow through continuous learning. My mission is to move forward with steady, purposeful steps toward my goals.
          </p>
        </div>

      </div>
    </section>
  );
}
