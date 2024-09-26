'use client';
import React, { useEffect, useState } from 'react';
import { Store } from '@/functions/stores/store.interface';
import getStores from '@/functions/stores/getStores.function';
import styles from './page.module.css';
import cn from 'classnames';
import { jura, oswald } from '@/fonts/fonts';
import Link from 'next/link';
import createContact from '@/functions/contacts/createContact.function';

export default function Buy() {
  const [stores, setStores] = useState<Store[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tg: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    tg: '',
    comment: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // Состояние для сообщения об успехе

  useEffect(() => {
    async function fetchStores() {
      try {
        const fetchedStores = await getStores();
        setStores(fetchedStores || []);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    }

    fetchStores().catch((error) => {
      console.error('Error fetching stores:', error);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors on input change
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { name: '', email: '', tg: '', comment: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
      valid = false;
    } else {
      // Simple email regex for validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Неверный формат Email';
        valid = false;
      }
    }
    if (!formData.tg.trim()) {
      newErrors.tg = 'Telegram обязателен';
      valid = false;
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Комментарий обязателен';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return; // If the form is not valid, do not submit

    try {
      await createContact(formData);
      setFormData({
        name: '',
        email: '',
        tg: '',
        comment: '',
      });
      setSuccessMessage('Мы свяжемся с вами в ближайшее время'); // Установить сообщение об успехе
    } catch (error) {
      console.error('Error creating a contact', error);
    }
  };

  return (
    <section className={cn(styles.buy)}>
      <h1 className={cn(oswald.className, styles.stores_title)}>
        Магазины и контакты
      </h1>
      <div>
        <div className={cn(styles.stores_wrapper)}>
          <h2 className={cn(oswald.className, styles.stores_name)}>Мы представлены в:</h2>
          {stores.length === 0 ? (
            <p>Загрузка...</p>
          ) : (
            stores.map((store, index) => (
              <div key={store._id}>
                <Link className={cn(styles.stores_link)} href={store.link} target="_blank" rel="noopener noreferrer">
                  <h3 className={cn(oswald.className, styles.stores_name)}>№{index + 1} {store.name}</h3>
                </Link>
                <p>{store.description}</p>
              </div>
            ))
          )}
        </div>
        <div>
          <form className={cn(styles.contact_form)} onSubmit={handleSubmit} noValidate>
            <h2 className={cn(oswald.className, styles.stores_name)}>Связаться с нами (покупка, сотрудничество, вышивка, вопрос)</h2>
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={'Имя'}
                className={cn(styles.form_input, jura.className)}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <div className={styles.error_message}>{errors.name}</div>}
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={'example@example.com'}
                className={cn(styles.form_input, jura.className)}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className={styles.error_message}>{errors.email}</div>}
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="tg">Telegram</label>
              <input
                type="text"
                id="tg"
                name="tg"
                placeholder={'mutno_mutno'}
                className={cn(styles.form_input, jura.className)}
                value={formData.tg}
                onChange={handleInputChange}
                required
              />
              {errors.tg && <div className={styles.error_message}>{errors.tg}</div>}
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label} htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                placeholder={'Комментарий'}
                className={cn(styles.form_textarea, jura.className)}
                value={formData.comment}
                onChange={handleInputChange}
                required
              />
              {errors.comment && <div className={styles.error_message}>{errors.comment}</div>}
            </div>
            <button type="submit" className={cn(styles.form_button, jura.className)}>Отправить</button>
          </form>
          {/* Сообщение об успехе */}
          {successMessage && <div className={styles.success_message}>{successMessage}</div>}
        </div>
      </div>
    </section>
  );
}
