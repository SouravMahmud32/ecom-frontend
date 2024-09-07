import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const { productList } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = productList.find((p) => p.id === productId);

  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.images[0]?.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-md"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">{product.description}</p>
          <span className="text-2xl font-bold">${product.price}</span>
          <div className="mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
