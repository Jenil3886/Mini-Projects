import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';

export default function Posts(){
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(()=>{ load(page); }, [page]);

  async function load(p){
    const res = await fetchPosts(p,10);
    setPosts(res.data || []);
    setMeta(res.meta || {});
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="space-y-4">
        {posts.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <Link to={`/posts/${p.id}`} className="text-lg font-semibold">{p.title}</Link>
            <div className="text-sm text-gray-500">by {p.User?.name || 'Unknown'}</div>
            <p className="mt-2">{p.content?.slice(0,200)}{p.content && p.content.length>200 ? '...' : ''}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button disabled={page<=1} onClick={()=>setPage(page-1)} className="px-3 py-1 bg-white border rounded">Prev</button>
        <div>Page {meta.page || 1} / {meta.pages || 1}</div>
        <button disabled={page>= (meta.pages||1)} onClick={()=>setPage(page+1)} className="px-3 py-1 bg-white border rounded">Next</button>
      </div>
    </div>
  );
}
