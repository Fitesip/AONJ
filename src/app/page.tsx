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
      setError(result.error || 'Login failed');
    }
  };

  return (
      <div>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
  );
}