import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password, errorCb) {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setUser(res.data.data);
      localStorage.setItem('access_token', res.data.token);
    } catch (err) {
      errorCb(err.response.data);
    }
  }

  async function signup(email, password, errorCb) {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, { email, password });
      setUser(res.data.data);
      localStorage.setItem('acces_token', res.data.token);
    } catch (err) {
      errorCb(err.response.data);
    }
  }

  async function getProfile(token) {
    setLoading(true)
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL}/auth/profile`, config)
      setUser(res.data.data)
    } catch (err) {
      console.error(err.response.data)
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('access_token')
  }

  return {
    user,
    login,
    signup,
    logout,
    getProfile,
    loading,
    setLoading,
  };
}
