import React, {useState} from 'react';
import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';

export default function NewPost(){
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function submit(e){
    e.preventDefault();
    if(!token) return alert('Login to create post');
    const res = await createPost(token, { title, content });
    if(res.id){
      navigate(`/posts/${res.id}`);
    } else {
      alert(res.message || 'Create failed');
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">New Post</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" className="w-full p-2 border rounded" rows="10" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Publish</button>
      </form>
    </div>
  );
}
