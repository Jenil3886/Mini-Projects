import React from 'react';
export default function ProductCard({ product }){
  return (
    <div className="rounded-lg shadow p-3 bg-white">
      <div className="h-36 bg-gray-100 rounded mb-2 flex items-center justify-center">
        <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.title} className="max-h-full" />
      </div>
      <div className="font-medium">{product.title}</div>
      <div className="text-sm text-gray-600">{product.description}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="font-semibold">₹{product.price}</div>
        <button className="px-3 py-1 rounded bg-black text-white">Add</button>
      </div>
    </div>
  );
}
