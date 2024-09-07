import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const { productList } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const product = productList.find((p) => p.id === productId);

  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {/* Image container */}
          <div className="relative w-full h-96">
            <img
              src={product.images[0]?.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">{product.description}</p>
          <span className="text-2xl font-bold">${product.price}</span>

          {/* Quantity control */}
          <div className="flex items-center mt-6 space-x-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Add to Cart (${(product.price * quantity).toFixed(2)})
            </button>
          </div>

          {/* Cart button */}
          <div className="mt-6">
            <Link
              to="/cart"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
