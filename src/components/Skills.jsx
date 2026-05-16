import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then(res => res.json())
      .then(setSkills)
      .catch(err => console.error(err));
  }, []);

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="section container animate-fade-up">
      <h2 className="text-large" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        TECHNICAL <span className="text-gradient">STACK</span>
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.5rem' }}>
        {skills.map(skill => (
          <div key={skill.id} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', transition: '0.3s' }}>
            <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{skill.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{skill.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
