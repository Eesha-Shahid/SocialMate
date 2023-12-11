'use client'
import React, { useEffect, useState } from 'react';
import { authStyle } from '../../styles/authStyle';
import Image from 'next/image';
import illustration from '../../assets/images/illustration.png';
import AuthService from '@/services/AuthService';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { ChangePassword } from '@/types/User';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';

export default function Reset() {

    const [email, setEmail] = useState<string | null>(null);
    const router = useRouter();
    const { user, setUser } = useUser();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const emailParam = queryParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, []);
 
    const handleSubmit = async(values: ChangePassword) => {
        try {
          if (email) {
            const userr = await AuthService.resetForgotPassword(email, values.newPassword, values.confirmPassword)
            if (userr){
                const data = await AuthService.login(email, values.newPassword);
                setUser(data)
                setCookie('token', data.token)
                console.log("Signed in successfully");
                router.push('/dashboard')
              }
        };
          
        } catch (error) {
          console.error('Sign-in error:', (error as Error).message);
        }
    } 

  return (
    <main style={authStyle.container}>
      <div style={authStyle.illustrationContainer}>
        <Image src={illustration} alt="Illustration" style={authStyle.illustration} />
        <div style={{ fontWeight: 600, fontSize: '22px', marginTop: '20px' }}>Reset Password?</div>
        <div style={{ fontSize: '22px', marginBottom: '20px' }}>No worries, we’ll send you reset instructions.</div>
      </div>

      <div style={authStyle.contentContainer}>
        <h1 style={authStyle.heading}>Forgot Password</h1>
        <Formik
            initialValues={{ currentPassword:"", newPassword: "", confirmPassword: "" }}
            onSubmit={( values: ChangePassword, { setSubmitting }: FormikHelpers<ChangePassword>) => {
            setTimeout(() => {
                handleSubmit(values);
                setSubmitting(false);
            }, 500);
            }}
            >
            <Form>
                <div style={authStyle.inputContainer}><Field name="newPassword" type="password" id="newPassword" placeholder='New Password'required style={authStyle.inputField} /></div>
                <div style={authStyle.inputContainer}><Field name="confirmPassword" type="password" id="confirmPassword" placeholder='Confirm Password'required style={authStyle.inputField} /></div>
                <div style={authStyle.buttonContainer}><button type="submit" style={authStyle.button}>Change Password</button></div>
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
