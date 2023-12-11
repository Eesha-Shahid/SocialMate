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
import { TSignup } from '@/types/User';
import SignUpHandler from '@/handlers/SignupHandlers';

export default function Register() {
  const router = useRouter();
  const {user, setUser} = useUser();
  const { handleRegisterSubmit } = SignUpHandler();

  return (
    <main style={authStyle.container}>
      <div style={authStyle.illustrationContainer}>
        <Image src={illustration} alt="Illustration" style={authStyle.illustration} />
        <div style={{ fontWeight: 600, fontSize: '22px', marginTop: '20px' }}>
        Embark on Your Social Adventure: 
        </div>
        <div style={{ fontSize: '22px', marginBottom: '20px' }}>Sign Up with SocialMate Today!</div>
        
      </div>

      <div style={authStyle.contentContainer}>
        <h1 style={authStyle.heading}>Sign Up</h1>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <GoogleLogin
              text='signup_with'
              useOneTap={true}
              onSuccess={async (credentialResponse) => {
                const data = await AuthService.googleSignup(credentialResponse)
                if (data.token){
                  setCookie('token',data.token)
                  setUser(data);
                  router.push('/dashboard')
                }
                else{

                }
              }}
              onError={() => {console.log("Signup Failed");}}
            />
          </GoogleOAuthProvider>     
        <p>OR</p>

        <Formik
            initialValues={{ username: "", email: "", password: "",}}
            onSubmit={( values: TSignup, { setSubmitting }: FormikHelpers<TSignup>) => {
            setTimeout(() => {
                handleRegisterSubmit(values);
                setSubmitting(false);
            }, 500);
            }}
        >
          <Form>
            <div style={authStyle.inputContainer}><Field name="username" type="username" id="username" placeholder='Username' required style={authStyle.inputField} /></div>
            <div style={authStyle.inputContainer}><Field name="email" type="email" id="email" placeholder='Email' required style={authStyle.inputField} /></div>
            <div style={authStyle.inputContainer}><Field name="password" type="password" id="password" placeholder='Password'required style={authStyle.inputField} /></div>
            <div style={authStyle.buttonContainer}><button type="submit" style={authStyle.button}>Sign Up</button></div>
          </Form>
        </Formik>

        {/* Sign Up Link */}
        <div style={authStyle.signUpLink}>
          Already have an account? <Link href="/login">Log in</Link>
        </div>
      </div>
    </main>
  );
}
