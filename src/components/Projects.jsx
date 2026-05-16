import React from 'react';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: "01",
      title: "Beginner Artists Campaign",
      desc: "Generated 520+ messaging conversations in 30 days with only a ৳600 daily budget. Achieved a low ৳13.65 cost per conversation through targeted strategy.",
      stats: [
        { label: "Conv", value: "520+" },
        { label: "Cost/C", value: "৳13.65" },
        { label: "Budget", value: "৳600/d" }
      ],
      icon: <Users size={28} />
    },
    {
      id: "02",
      title: "Whiteboard Product Campaign",
      desc: "Generated 1,667+ Meta leads in 150 days with a ৳1,043 daily budget. Achieved strong lead generation at only ৳48.38 cost per lead.",
      stats: [
        { label: "Leads", value: "1,667+" },
        { label: "Cost/L", value: "৳48.38" },
        { label: "Budget", value: "৳1,043/d" }
      ],
      icon: <Target size={28} />
    },
    {
      id: "03",
      title: "145 PCS Unicorn Art Set",
      desc: "Generated 5,573+ messaging conversations in 150 days with a ৳1,492 daily budget. Achieved an excellent ৳12.19 cost per conversation.",
      stats: [
        { label: "Conv", value: "5,573+" },
        { label: "Cost/C", value: "৳12.19" },
        { label: "Budget", value: "৳1,492/d" }
      ],
      icon: <TrendingUp size={28} />
    },
    {
      id: "04",
      title: "Canvas Combo Campaign",
      desc: "Generated 2,272+ messaging conversations in 50 days with a ৳2,010 daily budget. Achieved a strong ৳44.22 cost per conversation.",
      stats: [
        { label: "Conv", value: "2,272+" },
        { label: "Cost/C", value: "৳44.22" },
        { label: "Budget", value: "৳2,010/d" }
      ],
      icon: <BarChart3 size={28} />
    }
  ];

  return (
    <section id="projects" className="section container">
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-huge">PORTFOLIO <span className="text-gradient">PROJECTS</span></h2>
        <p className="text-body-large" style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Data-driven campaigns that turned audiences into active customers.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
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
                {project.icon}
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(255,255,255,0.1)' }}>{project.id}</span>
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
