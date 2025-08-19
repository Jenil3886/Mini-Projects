import React from 'react';

export default function SearchFilter({ search, setSearch, completed, setCompleted }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0' }}>
      <input
        placeholder="Search title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select value={completed} onChange={e => setCompleted(e.target.value)}>
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Pending</option>
      </select>
    </div>
  );
}
