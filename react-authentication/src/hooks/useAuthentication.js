import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default function useAuthentication() {
  const [user, setUser] = useState(null);

  async function login(email, password, errorCb) {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setUser(res.data.data);
    } catch (err) {
      errorCb(err.response.data);
    }
  }

  async function signup(email, password, errorCb) {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, { email, password });
      setUser(res.data.data);
    } catch (err) {
      errorCb(err.response.data);
    }
  }

  function logout() {
    setUser(null);
  }

  return {
    user,
    login,
    signup,
    logout,
  };
}
