import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Briefcase, GraduationCap, FolderDot, Save, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [validating, setValidating] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ heroText: '', aboutText: '', email: '' });
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetch('http://localhost:3000/api/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Invalid');
      setValidating(false);
      fetchData();
    })
    .catch(() => {
      localStorage.removeItem('adminToken');
      navigate('/admin');
    });
  }, [navigate]);

  const fetchData = async () => {
    fetch('http://localhost:3000/api/profile').then(res => res.json()).then(setProfile);
    fetch('http://localhost:3000/api/projects').then(res => res.json()).then(data => {
      setProjects(data.map(p => ({ ...p, stats: JSON.parse(p.stats || '[]') })));
    });
    fetch('http://localhost:3000/api/experience').then(res => res.json()).then(setExperiences);
    fetch('http://localhost:3000/api/education').then(res => res.json()).then(setEducations);
  };

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    'Content-Type': 'application/json'
  });

  const saveProfile = async () => {
    await fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profile)
    });
    alert('Profile saved!');
  };

  const addExperience = async () => {
    const newExp = { company: 'New Company', role: 'Role', period: '2025', desc: 'Description' };
    const res = await fetch('http://localhost:3000/api/experience', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(newExp)
    });
    const saved = await res.json();
    setExperiences([saved, ...experiences]);
  };

  const deleteExperience = async (id) => {
    await fetch(`http://localhost:3000/api/experience/${id}`, { method: 'DELETE', headers: getHeaders() });
    setExperiences(experiences.filter(e => e.id !== id));
  };

  if (validating) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Loading...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="glass-panel" style={{ width: '250px', padding: '2rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--glass-border)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem' }}>Prottoy Admin</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <button onClick={() => setActiveTab('profile')} className="btn-glass" style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: activeTab === 'profile' ? 'rgba(255,255,255,0.1)' : 'transparent' }}><LayoutDashboard size={18} /> Profile</button>
          <button onClick={() => setActiveTab('projects')} className="btn-glass" style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: activeTab === 'projects' ? 'rgba(255,255,255,0.1)' : 'transparent' }}><FolderDot size={18} /> Projects</button>
          <button onClick={() => setActiveTab('experience')} className="btn-glass" style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: activeTab === 'experience' ? 'rgba(255,255,255,0.1)' : 'transparent' }}><Briefcase size={18} /> Experience</button>
          <button onClick={() => setActiveTab('education')} className="btn-glass" style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: activeTab === 'education' ? 'rgba(255,255,255,0.1)' : 'transparent' }}><GraduationCap size={18} /> Education</button>
        </nav>

        <button onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin'); }} className="btn-glass" style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444', borderColor: '#ef4444' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        
        {activeTab === 'profile' && (
          <div className="glass-card animate-fade-up" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem' }}>Edit Profile</h1>
              <button onClick={saveProfile} className="btn-primary"><Save size={18} /> Save</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Hero Text</label>
                <textarea 
                  value={profile.heroText || ''} 
                  onChange={e => setProfile({...profile, heroText: e.target.value})}
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', minHeight: '100px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>About Me Text</label>
                <textarea 
                  value={profile.aboutText || ''} 
                  onChange={e => setProfile({...profile, aboutText: e.target.value})}
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', minHeight: '150px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Contact Email</label>
                <input 
                  type="email"
                  value={profile.email || ''} 
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem' }}>Manage Experience</h1>
              <button onClick={addExperience} className="btn-primary"><Plus size={18} /> Add New</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {experiences.map(exp => (
                <div key={exp.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <input 
                        value={exp.company} 
                        onChange={e => setExperiences(experiences.map(x => x.id === exp.id ? {...x, company: e.target.value} : x))}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                      />
                      <input 
                        value={exp.role} 
                        onChange={e => setExperiences(experiences.map(x => x.id === exp.id ? {...x, role: e.target.value} : x))}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                      />
                      <input 
                        value={exp.period} 
                        onChange={e => setExperiences(experiences.map(x => x.id === exp.id ? {...x, period: e.target.value} : x))}
                        style={{ width: '150px', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                      />
                    </div>
                    <textarea 
                      value={exp.desc} 
                      onChange={e => setExperiences(experiences.map(x => x.id === exp.id ? {...x, desc: e.target.value} : x))}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                    />
                    <button onClick={async () => {
                      await fetch(`http://localhost:3000/api/experience/${exp.id}`, {
                        method: 'PUT', headers: getHeaders(), body: JSON.stringify(exp)
                      });
                      alert('Saved');
                    }} className="btn-glass" style={{ alignSelf: 'flex-start', padding: '0.25rem 1rem' }}>Save Experience</button>
                  </div>
                  <button onClick={() => deleteExperience(exp.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'projects' || activeTab === 'education') && (
          <div className="glass-card animate-fade-up" style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{activeTab === 'projects' ? 'Projects' : 'Education'}</h1>
            <p style={{ color: 'var(--text-muted)' }}>The CRUD forms for {activeTab} follow the exact same pattern as Experience. You can add them as needed!</p>
          </div>
        )}

      </div>
    </div>
  );
}
