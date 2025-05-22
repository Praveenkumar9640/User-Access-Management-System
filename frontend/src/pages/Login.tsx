import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/welcome');
    } catch {
      setError('Wrong username or password');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ width: '300px', margin: '100px auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: 10 }}>New user? <a href="/signup">Signup here</a></p>
    </form>
  );
}
