import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  const [educations, setEducations] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/education')
      .then(res => res.json())
      .then(data => setEducations(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="section container">
      <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
        
        {/* Title */}
        <div className="animate-fade-up">
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', color: 'var(--accent-3)', marginBottom: '1.5rem' }}>
            <GraduationCap size={32} />
          </div>
          <h2 className="text-huge" style={{ marginBottom: '1.5rem' }}>EDUCATION</h2>
          <p className="text-body-large" style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
            An overview of my educational journey, shaped by hands-on training, practical experience, and continuous learning.
          </p>
        </div>

        {/* List */}
        <div className="animate-fade-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {educations.map((edu, idx) => (
            <div key={idx} className="glass-card" style={{ 
              padding: '2rem',
              position: 'relative',
              overflow: 'visible'
            }}>
              {/* Glowing dot on the side */}
              <div style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                backgroundColor: 'var(--accent-3)',
                borderRadius: '50%',
                boxShadow: '0 0 15px var(--accent-3)',
                display: 'none' // Hide on mobile without a proper timeline line
              }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 700 }}>{edu.institution}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{edu.degree}</p>
                </div>
                <span style={{ 
                  background: 'rgba(236, 72, 153, 0.1)', 
                  color: 'var(--accent-3)', 
                  padding: '4px 12px', 
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
