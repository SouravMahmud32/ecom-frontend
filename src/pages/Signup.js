import React from 'react';
import AuthForm from '../components/AuthForm';
import { FaGoogle } from 'react-icons/fa';

const Signup = () => {
  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Redirect to Google login route
  };
  return (
    <div className=" text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <AuthForm />
      <button
        onClick={handleGoogleSignup}
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

export default Signup;
