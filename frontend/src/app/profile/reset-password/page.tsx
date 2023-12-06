'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/AuthService';

const ResetPassword = () => {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await AuthService.resetPassword(passwords.currentPassword, passwords.newPassword, passwords.confirmNewPassword, token);
      router.push('/profile'); 
    } catch (error) {
      console.error('Error resetting password:', (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input
            type="password"
            name="confirmNewPassword"
            value={passwords.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
