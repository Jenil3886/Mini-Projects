import React, { useState } from "react";
import { itemsApi } from "../services/api";
import ItemList from "../components/ItemList";

const Dashboard =({ user, onLogout }) =>{
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", category: "", price: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await itemsApi.update(editing.id, form);
        setEditing(null);
      } else {
        await itemsApi.create(form);
      }
      setForm({ name: "", description: "", category: "", price: "" });
     
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description, category: item.category, price: item.price });
  };

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard — {user.name}</h2>
        <button onClick={onLogout}>Logout</button>
      </header>

      <section style={{ marginTop: 18 }}>
        <h3>{editing ? "Edit Item" : "Create Item"}</h3>
        <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 600 }}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm(s => ({...s, name: e.target.value}))} required />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm(s => ({...s, category: e.target.value}))} />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm(s => ({...s, description: e.target.value}))} />
          <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm(s => ({...s, price: e.target.value}))} />
          <div>
            <button type="submit">{editing ? "Update" : "Create"}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", description: "", category: "", price: "" }) }}>Cancel</button>}
          </div>
        </form>
      </section>

      <hr style={{ margin: "20px 0" }} />

      <ItemList onEdit={handleEdit} />
    </div>
  );
}

export default Dashboard
