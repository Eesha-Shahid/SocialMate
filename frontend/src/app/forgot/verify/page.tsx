'use client'
import React from 'react';
import { authStyle } from '../../../styles/authStyle';
import { useRouter } from 'next/navigation';

export default function Verify() {

  const router = useRouter();

  return (
    <main style={authStyle.container}>
        <div style={authStyle.contentContainer}>
            <h1 style={authStyle.heading}>Reset email sent</h1>
            <div style={{ fontSize: '22px', marginBottom: '20px' }}>We have just sent you an email with a password reset link..</div>
            <div style={authStyle.buttonContainer}><button onClick={()=>{router.push('/login')}} style={authStyle.button}>Back to Login</button></div>
        </div>
    </main>
  );
}
