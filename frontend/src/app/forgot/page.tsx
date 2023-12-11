'use client'
import React from 'react';
import { authStyle } from '../../styles/authStyle';
import Image from 'next/image';
import illustration from '../../assets/images/illustration.png';
import AuthService from '@/services/AuthService';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type forgotPasswordInput = {
  email: string;
}

export default function Forgot() {

  const router = useRouter();

  const handleSubmit = async(values: forgotPasswordInput) => {
    try {
      const response = await AuthService.forgotPassword(values.email);
      if (response){
        router.push('/forgot/verify')
      }
    } catch (error) {
      console.error('Sign-in error:', (error as Error).message);
    }
  } 

  return (
    <main style={authStyle.container}>
      <div style={authStyle.illustrationContainer}>
        <Image src={illustration} alt="Illustration" style={authStyle.illustration} />
        <div style={{ fontWeight: 600, fontSize: '22px', marginTop: '20px' }}>Forgot Password?</div>
        <div style={{ fontSize: '22px', marginBottom: '20px' }}>No worries, we’ll send you reset instructions.</div>
      </div>

      <div style={authStyle.contentContainer}>
        <h1 style={authStyle.heading}>Forgot Password</h1>
        <Formik
            initialValues={{ email: "" }}
            onSubmit={( values: forgotPasswordInput, { setSubmitting }: FormikHelpers<forgotPasswordInput>) => {
            setTimeout(() => {
              handleSubmit(values);
                setSubmitting(false);
            }, 500);
            }}
        >
          <Form>
            <div style={authStyle.inputContainer}><Field name="email" type="email" id="email" placeholder='Enter Your Email' required style={authStyle.inputField} /></div>
            <div style={authStyle.buttonContainer}><button type="submit" style={authStyle.button}>Verify Email</button></div>
          </Form>
        </Formik>

        {/* Forgot Password Link */}
        <div style={authStyle.forgotPasswordLink}>
          <Link href="/login">Back to Login</Link>
        </div>

      </div>
    </main>
  );
}
