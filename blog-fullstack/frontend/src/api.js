const API = '/api';

export async function signup(data){
  const res = await fetch(API + '/auth/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function login(data){
  const res = await fetch(API + '/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchPosts(page=1, limit=10){
  const res = await fetch(API + `/posts?page=${page}&limit=${limit}`);
  return res.json();
}

export async function fetchPost(id){
  const res = await fetch(API + `/posts/${id}`);
  return res.json();
}

export async function createPost(token, data){
  const res = await fetch(API + '/posts', {
    method: 'POST',
    headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + token},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function addComment(token, postId, data){
  const res = await fetch(API + `/comments/${postId}`, {
    method: 'POST',
    headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + token},
    body: JSON.stringify(data)
  });
  return res.json();
}
