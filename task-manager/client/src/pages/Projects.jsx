import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function load() {
    const res = await api('/projects');
    setProjects(res);
  }

  useEffect(() => { load(); }, []);

  async function createProject(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await api('/projects', { method: 'POST', body: { name: name.trim(), description } });
    setName(''); setDescription('');
    await load();
  }

  return (
    <div>
      <form onSubmit={createProject} style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
        <input placeholder="Project name" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button>Create Project</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {projects.map(p => (
          <li key={p.id} style={{ border: '1px solid #ddd', padding: 8, borderRadius: 8 }}>
            <Link to={`/projects/${p.id}`}><strong>{p.name}</strong></Link>
            {p.description && <div style={{ fontSize: 13 }}>{p.description}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
