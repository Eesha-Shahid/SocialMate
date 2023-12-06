// components/Register.tsx
import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const data = await AuthService.register(formData.username, formData.email, formData.password);
      console.log('Registration successful:', data);
      const loginData = await AuthService.login(formData.email, formData.password);
      localStorage.setItem('token', loginData.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', (error as Error).message);
    }
  };

  const handleSignUpWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <button type="button" onClick={handleSignUpWithGoogle}>Sign In with Google</button>
      <p onClick={() => router.push('/login')}>Already have an account?{' '}Sign In</p>
    </div>
  );
};

export default RegisterForm;
