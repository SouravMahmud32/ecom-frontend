import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      // Log in the user and redirect to home
      login({ token });
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [login, navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;
