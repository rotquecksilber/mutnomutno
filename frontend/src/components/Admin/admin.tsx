'use client';
import React, { useState } from 'react';
import signinUser from '@/functions/users/signin.function';
import styles from './page.module.css';

interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function Admin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setServerError('');

    if (!username || !password) {
      setError('Логин и пароль обязательны');
      setLoading(false);
      return;
    }

    try {
      const response = await signinUser({ username, password });
      const token = response.access_token;

      localStorage.setItem('token', token);

      window.location.href = '/admin/panel/products';
    } catch (err: unknown) {
      const error = err as ApiError; // Приводим ошибку к типу ApiError
      const message = error?.response?.data?.message || 'Логин и/или пароль введены неверно';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.login_title}>Admin Login</h1>
      <form className={styles.login_form} onSubmit={handleSubmit} noValidate>
        <div className={styles.form_group}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submit_button} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        {error && <p className={styles.error_message}>{error}</p>}
        {serverError && <p className={styles.server_error_message}>{serverError}</p>}
      </form>
    </div>
  );
}
