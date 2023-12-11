'use client'
import React from 'react';
import { authStyle } from '../../styles/authStyle';
import Image from 'next/image';
import illustration from '../../assets/images/illustration.png';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import AuthService from '@/services/AuthService';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TLogin } from '@/types/User';
import LoginHandlers from '@/handlers/LoginHandlers';

export default function Login() {
  const router = useRouter();
  const {user, setUser} = useUser();
  const { handleLoginSubmit } = LoginHandlers();

  return (
    <main style={authStyle.container}>
      <div style={authStyle.illustrationContainer}>
        <Image src={illustration} alt="Illustration" style={authStyle.illustration} />
        <div style={{ fontWeight: 600, fontSize: '22px', marginTop: '20px' }}>
          Effortless Access, Endless Possibilities:
        </div>
        <div style={{ fontSize: '22px', marginBottom: '20px' }}>Log In to SocialMate.</div>
        
      </div>

      <div style={authStyle.contentContainer}>
        <h1 style={authStyle.heading}>Sign In</h1>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
              <GoogleLogin
                useOneTap={true}
                onSuccess={async (credentialResponse) => {
                    const data = await AuthService.googleLogin(credentialResponse)
                    if (data.token){
                    setCookie('token',data.token)
                    setUser(data);
                    router.push('/dashboard')
                    }
                }}
                onError={() => {console.log("Login Failed");}}
              />
          </GoogleOAuthProvider>        
        <p>OR</p>

        <Formik
            initialValues={{ email: "", password: "",}}
            onSubmit={( values: TLogin, { setSubmitting }: FormikHelpers<TLogin>) => {
            setTimeout(() => {
                handleLoginSubmit(values);
                setSubmitting(false);
            }, 500);
            }}
        >
          <Form>
            <div style={authStyle.inputContainer}><Field name="email" type="email" id="email" placeholder='Email' required style={authStyle.inputField} /></div>
            <div style={authStyle.inputContainer}><Field name="password" type="password" id="password" placeholder='Password'required style={authStyle.inputField} /></div>
            <div style={authStyle.buttonContainer}><button type="submit" style={authStyle.button}>Log in</button></div>
          </Form>
        </Formik>

        {/* Forgot Password Link */}
        <div style={authStyle.forgotPasswordLink}>
          <Link href="/forgot">Forgot Password?</Link>
        </div>
        

        {/* Sign Up Link */}
        <div style={authStyle.signUpLink}>
          Don't have an account? <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </main>
  );
}
