import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="section container animate-fade-up" style={{ padding: '2rem 0', marginTop: '4rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
      <div>
        <p style={{ fontWeight: 800, fontSize: '1.25rem' }}>THANK YOU SO MUCH</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0.5rem auto 0' }}>
          Thank you for taking the time to view my work. I appreciate your interest and support.
        </p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Designed with <Heart size={16} color="var(--accent-3)" /> for Prottoy D'Rozario.
      </div>
    </footer>
  );
}
