import React from 'react';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(res => res.json())
      .then(data => {
        // Parse the stats JSON string
        const parsedData = data.map(p => ({
          ...p,
          stats: JSON.parse(p.stats)
        }));
        setProjects(parsedData);
      })
      .catch(err => console.error(err));
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Users': return <Users size={28} />;
      case 'Target': return <Target size={28} />;
      case 'TrendingUp': return <TrendingUp size={28} />;
      case 'BarChart3': return <BarChart3 size={28} />;
      default: return <BarChart3 size={28} />;
    }
  };

  return (
    <section id="projects" className="section container">
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-huge">PORTFOLIO <span className="text-gradient">PROJECTS</span></h2>
        <p className="text-body-large" style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Data-driven campaigns that turned audiences into active customers.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {projects.map((project, idx) => (
          <div key={project.id} className={`glass-card animate-fade-up delay-${(idx+1)*100}`} style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                color: 'var(--accent-1)',
                background: 'rgba(139, 92, 246, 0.1)',
                padding: '1rem',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                {getIcon(project.icon)}
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>0{idx + 1}</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 }}>{project.title}</h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', flex: 1 }}>{project.desc}</p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--glass-border)'
            }}>
              {project.stats.map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
