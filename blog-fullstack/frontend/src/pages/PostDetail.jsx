import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, addComment } from '../api';

export default function PostDetail(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(()=>{ load(); }, [id]);

  async function load(){
    const p = await fetchPost(id);
    setPost(p);
    // fetch comments
    const cRes = await fetch('/api/comments/' + id);
    const c = await cRes.json();
    setComments(c || []);
  }

  async function handleComment(e){
    e.preventDefault();
    if(!token) return alert('Login to comment');
    await addComment(token, id, { content: text });
    setText('');
    load();
  }

  if(!post) return <div>Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="text-sm text-gray-500">by {post.User?.name}</div>
      <div className="mt-4 bg-white p-4 rounded shadow">{post.content}</div>

      <section className="mt-6">
        <h2 className="font-semibold">Comments</h2>
        <div className="space-y-3 mt-3">
          {comments.map(c=>(
            <div key={c.id} className="bg-white p-3 rounded">
              <div className="text-sm text-gray-600">{c.User?.name}</div>
              <div className="mt-1">{c.content}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleComment} className="mt-4">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full p-2 border rounded" rows="3" />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Add Comment</button>
        </form>
      </section>
    </div>
  );
}
