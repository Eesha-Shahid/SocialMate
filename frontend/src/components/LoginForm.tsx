'use client'
import { Field, Form, Formik, FormikHelpers } from 'formik';

// Types
import { TLogin } from '@/types/User';

import LoginHandlers from '../handlers/LoginHandlers';

const LoginForm = () => {
  const { handleForgotPassword, handleSignUp, handleSignInWithGoogle, handleLoginSubmit } = LoginHandlers();

  const googleIcon = "https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_640.png"

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <Formik
        initialValues={{ email: "", password: "",}}
        onSubmit={( values: TLogin, { setSubmitting }: FormikHelpers<TLogin>) => {
          setTimeout(() => {
            handleLoginSubmit(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
          <label htmlFor='email' style={{ textAlign: 'left', marginBottom: '5px' }}>Email:</label>
          <Field id="email" type="email" name="email" placeholder="Enter email" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
          <label htmlFor='password' style={{ textAlign: 'left', marginBottom: '5px' }}>Password:</label>
          <Field id="password" type="password" name="password" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Log in</button>
        </Form>
      </Formik>
      <p onClick={handleForgotPassword} style={{ marginTop: '10px', textAlign: 'right', cursor: 'pointer', color: '#4285F4' }}>Forgot Password?</p>
      <button type="button" onClick={handleSignInWithGoogle} style={{ marginTop: '10px', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '95%' }}>
        <img src={googleIcon} alt="Google Icon" style={{  width: '20px', height: '20px', marginRight: '10px' }} />
        Sign In with Google
      </button>
      <p onClick={handleSignUp} style={{ marginTop: '10px', cursor: 'pointer'}}>Don't have an account?{' '}<span style={{color: '#4285F4'}}>Sign Up</span></p>
    </div>
  );
};

export default LoginForm;