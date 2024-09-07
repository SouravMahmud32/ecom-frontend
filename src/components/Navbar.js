import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-black text-2xl font-bold">
          <span className="rounded-full bg-blue-500 p-2 text-white">f</span>
          Furni<span className="text-blue-500">flex</span>
        </Link>
      </div>

      {/* Middle: Nav */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-black hover:text-gray-900">Home</Link>
        <Link to="/products" className="text-black hover:text-gray-900">Products</Link>
        <Link to="/blog" className="text-black hover:text-gray-900">Blog</Link>
      </div>

      {/* Right: Cart and User Icon */}
      <div className="flex items-center space-x-6">
        {/* Cart Icon */}
        <Link to="/cart" className="relative text-gray-700">
          <FaShoppingCart className="h-6 w-6" />
          {totalItemsInCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItemsInCart}
            </span>
          )}
        </Link>

        {/* User Profile Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none"
          >
            {auth?.photoUrl ? (
              <img
                src={auth.photoUrl}
                alt="User Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="h-8 w-8 text-gray-700" />
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              {auth ? (
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                
                <>
                  <Link
                    to="/login"
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)} // Close dropdown after clicking
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)} // Close dropdown after clicking
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
