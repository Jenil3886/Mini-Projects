import { useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {
const [user, setUser] = useState(() => {
  try {
    const row = localStorage.getItem("user");
    if (!row || row === "undefined") return null;
    return JSON.parse(row);
  } catch (e) {
    console.error("Invalid user JSON:", e);
    return null;
  }
});


const handleLogin = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  setUser(user);
};

  
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
<Routes>
  <Route path="/login" element={<Login onLogin={handleLogin} />} />
  <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
  <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
</Routes>
  )
}

export default App
