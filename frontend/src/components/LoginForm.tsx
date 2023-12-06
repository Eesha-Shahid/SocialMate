'use client'
import { useState } from 'react';
import AuthService from '../services/AuthService'
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const data = await AuthService.login(credentials.email, credentials.password);
      console.log('Sign-in successful:', data);
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign-in error:', (error as Error).message);
    }
  };

  const handleSignInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
      <button type="button" onClick={handleSignInWithGoogle}>Sign In with Google</button>
      <p onClick={() => router.push('/register')}>Don't have an account?{' '}Sign Up</p>
    </div>
  );
};

export default LoginForm;