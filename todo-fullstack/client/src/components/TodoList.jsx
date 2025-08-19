import React from 'react';

export default function TodoList({ items, onToggle, onDelete, onEdit }) {
  if (!items.length) return <div>No todos</div>;
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
      {items.map(t => (
        <li key={t.id} style={{ border: '1px solid #ddd', padding: 8, borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <input type="checkbox" checked={t.completed} onChange={() => onToggle(t)} />
              <strong style={{ marginLeft: 8, textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</strong>
              {t.description && <div style={{ fontSize: 12, opacity: 0.8 }}>{t.description}</div>}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => onEdit(t)}>Edit</button>
              <button onClick={() => onDelete(t.id)} style={{ color: 'crimson' }}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
