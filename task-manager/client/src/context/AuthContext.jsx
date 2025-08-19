import React, { createContext, useContext, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  function saveAuth({ token, user }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  async function login(email, password) {
    const res = await api('/auth/login', { method: 'POST', body: { email, password }, auth: false });
    saveAuth(res);
  }

  async function signup(name, email, password) {
    const res = await api('/auth/signup', { method: 'POST', body: { name, email, password }, auth: false });
    saveAuth(res);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  const value = { user, login, signup, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
