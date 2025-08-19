import React from 'react';
import Home from './pages/Home';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 shadow-sm bg-white">
        <div className="max-w-6xl mx-auto">E-commerce Mini</div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Home />
      </main>
    </div>
  );
}
