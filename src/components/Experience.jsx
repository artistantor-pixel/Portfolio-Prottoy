import React from 'react';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const [experiences, setExperiences] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/experience')
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="experience" className="section container">
      <div className="grid-2" style={{ gap: '4rem' }}>
        
        {/* Intro */}
        <div className="animate-fade-up">
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', color: 'var(--accent-2)', marginBottom: '1.5rem' }}>
            <Briefcase size={32} />
          </div>
          <h2 className="text-huge" style={{ marginBottom: '2rem' }}>MY<br /><span className="text-gradient">EXPERIENCE</span></h2>
          <p className="text-body-large" style={{ color: 'var(--text-muted)' }}>
            I'm a skilled Digital Marketer and Graphic Designer with three years of experience in social media marketing, Facebook ads, logo design, branding, YouTube SEO, and general SEO. Proficient in Canva, Meta Ads Manager, and SEO tools, I create data-driven strategies and engaging visuals to boost businesses' online presence.
          </p>
        </div>

        {/* List */}
        <div className="animate-fade-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiences.map((exp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {exp.company} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>— {exp.role}</span>
                </h4>
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  color: 'var(--accent-2)', 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  padding: '4px 12px', 
                  borderRadius: '9999px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  {exp.period}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{exp.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
