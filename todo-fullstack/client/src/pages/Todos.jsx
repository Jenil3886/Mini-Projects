import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState('');
  const [editing, setEditing] = useState(null);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    if (search) params.set('search', search);
    if (completed !== '') params.set('completed', completed);
    return '?' + params.toString();
  }, [page, limit, search, completed]);

  async function load() {
    const res = await api('/todos' + query);
    setTodos(res.data);
    setTotalPages(res.totalPages);
  }

  useEffect(() => { load(); }, [query]);

  async function createTodo({ title, description }) {
    await api('/todos', { method: 'POST', body: { title, description } });
    setPage(1); // jump to first page to see new item
    await load();
  }

  async function toggle(todo) {
    await api(`/todos/${todo.id}`, { method: 'PUT', body: { completed: !todo.completed } });
    await load();
  }

  async function remove(id) {
    await api(`/todos/${id}`, { method: 'DELETE' });
    await load();
  }

  async function saveEdit(todo) {
    await api(`/todos/${todo.id}`, { method: 'PUT', body: { title: todo.title, description: todo.description } });
    setEditing(null);
    await load();
  }

  return (
    <div>
      <TodoForm onCreate={createTodo} />
      <SearchFilter search={search} setSearch={setSearch} completed={completed} setCompleted={setCompleted} />

      {editing ? (
        <EditInline todo={editing} onCancel={() => setEditing(null)} onSave={saveEdit} />
      ) : null}

      <TodoList items={todos} onToggle={toggle} onDelete={remove} onEdit={setEditing} />
      <Pagination page={page} totalPages={totalPages} onPage={setPage} />
    </div>
  );
}

function EditInline({ todo, onCancel, onSave }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ ...todo, title, description }); }} style={{ display: 'grid', gap: 6, margin: '12px 0', padding: 8, border: '1px dashed #bbb' }}>
      <h4>Edit Todo</h4>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
