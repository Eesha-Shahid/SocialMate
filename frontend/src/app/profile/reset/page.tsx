'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/AuthService';
import Sidebar from '@/components/Sidebar';

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
      await AuthService.resetPassword(passwords.currentPassword, passwords.newPassword, passwords.confirmNewPassword);
      router.push('/profile'); 
    } catch (error) {
      console.error('Error resetting password:', (error as Error).message);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Current Password
            <input
            style={fieldStyles}
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              required
            />
          </label><br />
          <label>
            New Password
            <input
              style={fieldStyles}
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
          </label><br />
          <label>
            Confirm Password
            <input
            style={fieldStyles}
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button style={buttonStyle} type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

const fieldStyles = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '5px',
  margin: '8px 0',
  minHeight: '30px', 
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: 'black',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '20px',
};

export default ResetPassword;
