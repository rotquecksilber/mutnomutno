'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import createUser from '@/functions/users/createUser.function';
import axios from "axios";

// Интерфейс для данных формы
interface FormData {
  email: string;
  username: string;
  name: string;
  password: string;
  role: string;
}

// Интерфейс для ошибок формы
interface FormErrors {
  email?: string;
  username?: string;
  name?: string;
  password?: string;
  server?: string;
}

function AdminRegistration() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    name: '',
    password: '',
    role: 'admin', // Default role is set to 'admin'
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    username: '',
    name: '',
    password: '',
    server: '',
  });

  const [submitStatus, setSubmitStatus] = useState(''); // Статус успешности или ошибки
  const [loading, setLoading] = useState(false); // Состояние загрузки для асинхронного запроса

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Basic validation for email, password, and name
    if (name === 'email') {
      setFormErrors({
        ...formErrors,
        email: value.includes('@') ? '' : 'Invalid email address',
      });
    }

    if (name === 'password') {
      setFormErrors({
        ...formErrors,
        password: value.length >= 6 ? '' : 'Password must be at least 6 characters',
      });
    }

    if (name === 'name') {
      setFormErrors({
        ...formErrors,
        name: value.trim() !== '' ? '' : 'Name is required',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FormErrors = {}; // Используем интерфейс для типизации

    // Custom validation for empty fields
    if (!formData.email) {
      errors.email = 'Email is required';
    }

    if (!formData.username) {
      errors.username = 'Username is required';
    }

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    // Update form errors
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      setLoading(true); // Set loading state
      setSubmitStatus(''); // Clear previous status messages

      try {
        await createUser(formData); // Отправка данных формы на сервер
        setSubmitStatus('Registration successful!');
        setFormData({
          email: '',
          username: '',
          name: '',
          password: '',
          role: 'admin',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Обрабатываем ошибку запроса axios
          const serverError = error.response?.data?.message || 'Registration failed. Please try again.';
          setFormErrors({ ...formErrors, server: serverError });
          setSubmitStatus('Registration failed. Please check your details and try again.');
        } else {
          // Обрабатываем другие возможные ошибки
          setSubmitStatus('An unexpected error occurred.');
        }
      } finally {
        setLoading(false); // Сброс состояния загрузки
      }
    }
  };

  return (
      <div className={styles.registration_container}>
        <h1 className={styles.registration_title}>Admin Registration</h1>

        {/* Show success or error message */}
        {submitStatus && <p className={submitStatus.includes('successful') ? styles.success_message : styles.error_message}>{submitStatus}</p>}
        {formErrors.server && <p className={styles.error_message}>{formErrors.server}</p>} {/* Display server errors */}

        <form className={styles.registration_form} onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            {formErrors.email && <span className={styles.error_message}>{formErrors.email}</span>}
          </div>

          <div className={styles.form_group}>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
            />
            {formErrors.username && <span className={styles.error_message}>{formErrors.username}</span>}
          </div>

          <div className={styles.form_group}>
            <label htmlFor="name">Name</label> {/* Добавлено новое поле для "name" */}
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            {formErrors.name && <span className={styles.error_message}>{formErrors.name}</span>}
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            {formErrors.password && <span className={styles.error_message}>{formErrors.password}</span>}
          </div>

          <button type="submit" className={styles.submit_button} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
  );
}

export default AdminRegistration;
