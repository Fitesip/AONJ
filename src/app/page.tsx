'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/auth';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if (isAuthenticated()) {
    router.push('/dashboard')
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Ошибка входа.');
    }
  };

  return (
      <div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Логин
              <input type="text" placeholder='Логин' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
          </div>
          <div>
            <label>
              Пароль
              <input type="password" placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
          </div>
          <button type="submit">Войти</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
  );
}