import React, { useEffect, useContext } from 'react';
import AuthForm from '../components/AuthForm';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if the login token is present in the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      // Save the token in local storage and log in the user
      login({ token });
      navigate('/'); // Redirect after login
    }
  }, [login, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Redirect to Google login route
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <AuthForm isLogin />
      <button
        onClick={handleGoogleLogin} // Trigger Google login
        aria-label="Login with Google"
        type="button"
        className="flex items-center justify-center w-full p-3 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:bg-green-600 hover:text-white"
      >
        <FaGoogle className="text-xl" />
        <p>Login with Google</p>
      </button>
    </div>
  );
};

export default Login;
