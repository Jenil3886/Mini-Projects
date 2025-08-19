import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  async function load() {
    const res = await api(`/projects/${id}?status=${filterStatus}&sortBy=${sortBy}&order=${order}`);
    setProject(res.project);
    setTasks(res.tasks);
  }

  // Load simple users list for assignment (fetch all users via /api/auth/users - implemented)
  async function loadUsers() {
    try {
      const res = await api('/auth/users');
      setUsers(res);
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => { load(); loadUsers(); }, [id, filterStatus, sortBy, order]);

  async function createTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await api('/tasks', { method: 'POST', body: { projectId: parseInt(id), title: title.trim(), description, assigneeId: assigneeId || null, dueDate: dueDate || null } });
    setTitle(''); setDescription(''); setAssigneeId(''); setDueDate('');
    await load();
  }

  async function updateTaskStatus(task, status) {
    await api(`/tasks/${task.id}`, { method: 'PUT', body: { status } });
    await load();
  }

  async function assignTask(task, assigneeId) {
    await api(`/tasks/${task.id}`, { method: 'PUT', body: { assigneeId: assigneeId || null } });
    await load();
  }

  return (
    <div>
      {project ? (
        <>
          <h2>{project.name}</h2>
          {project.description && <div style={{ marginBottom: 12 }}>{project.description}</div>}

          <form onSubmit={createTask} style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
            <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                <option value="">Unassigned</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
              </select>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              <button>Create Task</button>
            </div>
          </form>

          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="createdAt">Created</option>
              <option value="dueDate">Due Date</option>
            </select>
            <select value={order} onChange={e => setOrder(e.target.value)}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
            {tasks.map(t => (
              <li key={t.id} style={{ border: '1px solid #ddd', padding: 8, borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>{t.title}</strong>
                    <div style={{ fontSize: 13 }}>{t.description}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>Status: {t.status} | Assignee: {t.assignee ? t.assignee.name : '—'}</div>
                    {t.dueDate && <div style={{ fontSize: 12 }}>Due: {new Date(t.dueDate).toLocaleDateString()}</div>}
                  </div>
                  <div style={{ display: 'grid', gap: 6 }}>
                    {t.status !== 'todo' && <button onClick={() => updateTaskStatus(t, 'todo')}>Set To Do</button>}
                    {t.status !== 'in_progress' && <button onClick={() => updateTaskStatus(t, 'in_progress')}>Set In Progress</button>}
                    {t.status !== 'done' && <button onClick={() => updateTaskStatus(t, 'done')}>Set Done</button>}
                    <select value={t.assignee ? t.assignee.id : ''} onChange={e => assignTask(t, e.target.value)}>
                      <option value="">Unassigned</option>
                      {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : <div>Loading...</div>}
    </div>
  );
}
