import React from 'react';

export default function Pagination({ page, totalPages, onPage }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
      <button disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      <span>Page {page} / {totalPages || 1}</span>
      <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
