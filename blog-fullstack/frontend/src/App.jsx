import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewPost from './pages/NewPost';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="font-bold">Blog Mini</Link>
          <div className="space-x-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/new">New Post</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Posts/>} />
          <Route path="/posts/:id" element={<PostDetail/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/new" element={<NewPost/>} />
        </Routes>
      </main>
    </div>
  );
}
