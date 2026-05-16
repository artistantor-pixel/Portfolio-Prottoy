import React, { useState, useEffect } from 'react';
import { Send, Mail, Linkedin, Github } from 'lucide-react';
import API_URL from '../config';

export default function Contact() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/api/profile`)
      .then(res => res.json())
      .then(setProfile);
  }, []);
  return (
    <section id="contact" className="section container">
      <div className="glass-card animate-fade-up" style={{ padding: '4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-huge" style={{ marginBottom: '1rem' }}>Let's <span className="text-gradient">Work Together</span></h2>
        <p className="text-body-large" style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Ready to improve your online presence and turn audiences into active customers? Send me a message!
        </p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px', margin: '0 auto' }} onSubmit={e => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Your Name" 
            style={{ 
              width: '100%', 
              padding: '1rem 1.5rem', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--glass-border)',
              color: 'white',
              fontFamily: 'inherit',
              outline: 'none'
            }} 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            style={{ 
              width: '100%', 
              padding: '1rem 1.5rem', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--glass-border)',
              color: 'white',
              fontFamily: 'inherit',
              outline: 'none'
            }} 
          />
          <textarea 
            placeholder="Your Message" 
            rows="4"
            style={{ 
              width: '100%', 
              padding: '1rem 1.5rem', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--glass-border)',
              color: 'white',
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'none'
            }} 
          ></textarea>
          <button className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
            Send Message <Send size={18} />
          </button>
        </form>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {profile.email && <a href={`mailto:${profile.email}`} className="btn-glass" style={{ gap: '0.75rem' }}><Mail size={18}/> {profile.email}</a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" className="btn-glass" style={{ gap: '0.75rem' }}><Linkedin size={18}/> LinkedIn</a>}
          {profile.github && <a href={profile.github} target="_blank" className="btn-glass" style={{ gap: '0.75rem' }}><Github size={18}/> GitHub</a>}
        </div>
      </div>
    </section>
  );
}
