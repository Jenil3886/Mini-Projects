import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api/products');
        const j = await res.json();
        setProducts(j.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
