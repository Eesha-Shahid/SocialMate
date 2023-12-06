'use client'

import AuthService from '@/services/AuthService';
import {useRouter} from 'next/navigation';
import React, { useState } from 'react';

const SocialAuthForm = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        username: '',
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
            const token = localStorage.getItem('token')
            const data = await AuthService.connectToReddit(credentials.username, credentials.password, token);
            console.log('Sign-in successful:', data);
            router.push('/profile');
        } 
        catch (error) {
            console.error('Sign-in error:', (error as Error).message);
        }
    }

    return (
        <div>
        <h2>Login</h2>
        <form>
            <label>
            Username:
            <input
                type="text"
                name="username"
                value={credentials.username}
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
            <button onClick={handleSignIn} type="submit">Login</button>
        </form>
        </div>
    );
};

export default SocialAuthForm;
