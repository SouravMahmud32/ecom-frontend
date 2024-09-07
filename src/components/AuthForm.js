import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login/register request to backend
      const response = await axios.post(
        `https://ecom-backend-37eabr56l-souravmahmud32s-projects.vercel.app/api/auth/${isLogin ? 'login' : 'register'}`,
        formData
      );

      console.log('Response from server:', response.data);

      login(response.data);
      
      // Show success toast on login or registration
      toast.success(`Successfully ${isLogin ? 'Logged In' : 'Registered'}...`);

      setTimeout(() => {
        navigate('/'); // Redirect to home after toast notification
      }, 3000);
    } catch (error) {
      console.error('Error during authentication:', error.response); // Log the error response

      // Show error message if available
      const errorMessage = error.response?.data?.message || 'Authentication failed!';
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toast Container for toast messages */}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button className="bg-blue-600 text-white p-2 rounded w-full">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
