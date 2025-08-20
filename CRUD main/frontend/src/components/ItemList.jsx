import React, { useState, useEffect } from "react";
import { itemsApi } from "../services/api";

const ItemList =({ onEdit }) =>{
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);

  console.log('hfhgbf',items)

  const fetchItems = async () => {
    try {
      const params = { q, category, sort, page, limit };
      const res = await itemsApi.list(params);
      setItems(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchItems(); }, [q, category, sort, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    await itemsApi.remove(id);
    fetchItems();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
        {items.map((it) => (
          <div key={it.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}>
            <h4>{it.name}</h4>
            <p>{it.description}</p>
            <p>Category: {it.category}</p>
            <p>Price: {it.price}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onEdit(it)}>Edit</button>
              <button onClick={() => handleDelete(it.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span style={{ margin: "0 8px" }}>Page {page} — Total {total}</span>
        <button disabled={page * limit >= total} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}


export default ItemList