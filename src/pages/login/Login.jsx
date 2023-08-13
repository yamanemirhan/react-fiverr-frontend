import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Login.scss';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post('/auth/login', { username, password });
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      console.log(err);

      setError(err.response.data.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          required
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <span>{error && error}</span>
      </form>
    </div>
  );
}

export { Login };
