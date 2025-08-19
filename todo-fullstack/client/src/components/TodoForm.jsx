import React, { useState } from 'react';

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), description });
    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
      <input placeholder="Add todo title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
