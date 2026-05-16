import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, LayoutDashboard, Briefcase, GraduationCap, FolderDot, 
  Save, Plus, Trash2, User, Cpu, Sparkles, Settings, Globe, Mail, 
  Phone, MapPin, Linkedin, Github, Facebook, Image as ImageIcon
} from 'lucide-react';
import API_URL from '../config';

export default function AdminDashboard() {
  const [validating, setValidating] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({});
  const [settings, setSettings] = useState({});
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetch(`${API_URL}/api/verify`, {
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
    const fetchJson = (url) => fetch(`${API_URL}/api/${url}`).then(res => res.json());
    
    fetchJson('profile').then(setProfile);
    fetchJson('settings').then(setSettings);
    fetchJson('skills').then(setSkills);
    fetchJson('services').then(setServices);
    fetchJson('experience').then(setExperiences);
    fetchJson('education').then(setEducations);
    fetchJson('projects').then(data => {
      setProjects(data.map(p => ({ ...p, stats: JSON.parse(p.stats || '[]') })));
    });
  };

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
    'Content-Type': 'application/json'
  });

  const handleUpdate = async (endpoint, data, method = 'PUT') => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/${endpoint}`, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('Saved successfully!');
        fetchData();
      }
    } catch (err) {
      alert('Error saving data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (endpoint, id) => {
    if (!window.confirm('Are you sure?')) return;
    await fetch(`${API_URL}/api/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    fetchData();
  };

  if (validating) return <div className="loading-screen">Loading Dashboard...</div>;

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0c', color: 'white' }}>
      
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: '280px', background: '#111114', borderRight: '1px solid #222', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--accent-1)', padding: '0.5rem', borderRadius: '10px' }}><Sparkles size={24} /></div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>PROTTOY CMS</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <SidebarLink icon={<User size={18}/>} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <SidebarLink icon={<Cpu size={18}/>} label="Skills & Tools" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
          <SidebarLink icon={<Sparkles size={18}/>} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
          <SidebarLink icon={<FolderDot size={18}/>} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <SidebarLink icon={<Briefcase size={18}/>} label="Experience" active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
          <SidebarLink icon={<GraduationCap size={18}/>} label="Education" active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          <SidebarLink icon={<Settings size={18}/>} label="Site Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <button onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin'); }} style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '12px', border: '1px solid #333', background: 'transparent', color: '#ff4444', cursor: 'pointer' }}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p style={{ color: '#888' }}>Manage your portfolio {activeTab} information</p>
          </div>
          {loading && <div className="spinner">Saving...</div>}
        </header>

        {/* Tab: Profile */}
        {activeTab === 'profile' && (
          <section className="glass-card animate-fade-up" style={{ padding: '2.5rem', background: '#111114', border: '1px solid #222', borderRadius: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group">
                <label><Mail size={16}/> Email Address</label>
                <input value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} />
              </div>
              <div className="input-group">
                <label><Phone size={16}/> Phone Number</label>
                <input value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label><ImageIcon size={16}/> Profile Photo URL</label>
                <input value={profile.photoUrl || ''} onChange={e => setProfile({...profile, photoUrl: e.target.value})} />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>Hero Title Text</label>
                <textarea value={profile.heroText || ''} onChange={e => setProfile({...profile, heroText: e.target.value})} />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>About Me Description</label>
                <textarea value={profile.aboutText || ''} style={{ minHeight: '150px' }} onChange={e => setProfile({...profile, aboutText: e.target.value})} />
              </div>
              <div className="input-group">
                <label><Linkedin size={16}/> LinkedIn Profile</label>
                <input value={profile.linkedin || ''} onChange={e => setProfile({...profile, linkedin: e.target.value})} />
              </div>
              <div className="input-group">
                <label><Github size={16}/> GitHub Profile</label>
                <input value={profile.github || ''} onChange={e => setProfile({...profile, github: e.target.value})} />
              </div>
            </div>
            <button onClick={() => handleUpdate('profile', profile)} className="btn-primary" style={{ marginTop: '2rem' }}><Save size={18}/> Save Profile</button>
          </section>
        )}

        {/* Tab: Skills */}
        {activeTab === 'skills' && (
          <div className="animate-fade-up">
            <button onClick={() => handleUpdate('skills', { name: 'New Skill', category: 'Tools', iconName: 'Cpu' }, 'POST')} className="btn-primary" style={{ marginBottom: '2rem' }}><Plus size={18}/> Add Skill</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {skills.map(skill => (
                <div key={skill.id} className="glass-card" style={{ padding: '1.5rem', background: '#111114', border: '1px solid #222', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <input style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 600, width: '100%' }} value={skill.name} onChange={e => {}} />
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>{skill.category || 'Tool'}</p>
                  </div>
                  <button onClick={() => handleDelete('skills', skill.id)} style={{ color: '#ff4444', background: 'transparent', border: 'none' }}><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Settings */}
        {activeTab === 'settings' && (
          <section className="glass-card animate-fade-up" style={{ padding: '2.5rem', background: '#111114', border: '1px solid #222', borderRadius: '24px' }}>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group">
                <label><Globe size={16}/> Site Title</label>
                <input value={settings.siteTitle || ''} onChange={e => setSettings({...settings, siteTitle: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Primary Color</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input type="color" value={settings.primaryColor || '#3b82f6'} onChange={e => setSettings({...settings, primaryColor: e.target.value})} style={{ width: '50px', padding: 0, height: '50px' }} />
                  <input value={settings.primaryColor || ''} onChange={e => setSettings({...settings, primaryColor: e.target.value})} />
                </div>
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>Meta Description (SEO)</label>
                <textarea value={settings.metaDescription || ''} onChange={e => setSettings({...settings, metaDescription: e.target.value})} />
              </div>
            </div>
            <button onClick={() => handleUpdate('settings', settings)} className="btn-primary" style={{ marginTop: '2rem' }}><Save size={18}/> Update Settings</button>
          </section>
        )}

        {/* Other tabs follow the same simple pattern... */}
        {(activeTab === 'experience' || activeTab === 'education' || activeTab === 'projects' || activeTab === 'services') && (
           <div style={{ textAlign: 'center', padding: '5rem', color: '#555' }}>
              <Sparkles size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
              <p>CRUD management for {activeTab} is being streamlined...</p>
              <button onClick={fetchData} className="btn-glass" style={{ marginTop: '1rem' }}>Reload Data</button>
           </div>
        )}

      </main>

      <style>{`
        .input-group { display: flex; flexDirection: column; gap: 0.75rem; }
        .input-group label { color: #888; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; }
        .input-group input, .input-group textarea { 
          background: #1a1a1e; border: 1px solid #333; padding: 1rem; border-radius: 12px; color: white; outline: none; transition: 0.2s;
        }
        .input-group input:focus { border-color: var(--accent-1); box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
        .btn-primary { background: var(--accent-1); color: white; padding: 1rem 2rem; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: 0.3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(59, 130, 246, 0.4); }
        .loading-screen { min-height: 100vh; display: flex; align-items: center; justifyContent: center; background: #0a0a0c; color: white; font-size: 1.5rem; font-weight: 800; }
        .spinner { animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: '0.2s',
      background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
      color: active ? 'var(--accent-1)' : '#888',
      fontWeight: active ? 700 : 500
    }}>
      {icon} {label}
    </button>
  );
}
