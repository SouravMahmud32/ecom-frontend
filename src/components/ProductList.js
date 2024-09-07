import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { productList } = useContext(ProductContext);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productList.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-5">
            <img
              src={product.images[0]?.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
            <p className="mt-2 text-gray-600">{product.description.substring(0, 50)}...</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">${product.price}</span>
              <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

