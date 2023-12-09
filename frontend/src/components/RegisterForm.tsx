// components/Register.tsx
import SignUpHandler from '@/handlers/SignupHandlers';
import { TSignup } from '@/types/User';
import { Field, Form, Formik, FormikHelpers } from 'formik';

const RegisterForm = () => {
  const {handleSignUpWithGoogle, handleSignIn, handleRegisterSubmit} = SignUpHandler();
  const googleIcon = "https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_640.png"

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <Formik
        initialValues={{ username: "", email: "", password: "",}}
        onSubmit={( values: TSignup, { setSubmitting }: FormikHelpers<TSignup>) => {
          setTimeout(() => {
            handleRegisterSubmit(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
          <label htmlFor='username' style={{ textAlign: 'left', marginBottom: '5px' }}>Username:</label>
          <Field id="username" type="text" name="username" placeholder='Enter username' required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
          <br />
          <label htmlFor='email' style={{ textAlign: 'left', marginBottom: '5px' }}>Email:</label>
          <Field id="email" type="email" name="email" placeholder="Enter email" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
          <br />
          <label htmlFor='password' style={{ textAlign: 'left', marginBottom: '5px' }}>Password:</label>
          <Field id="password" type="password" name="password" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
          <br />
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
        </Form>
        
      </Formik>

      <button type="button" onClick={handleSignUpWithGoogle} style={{ marginTop: '10px', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '95%' }}>
        <img src={googleIcon} alt="Google Icon" style={{  width: '20px', height: '20px', marginRight: '10px' }} />
        Sign Up with Google
      </button>
      <p onClick={handleSignIn} style={{ marginTop: '10px', cursor: 'pointer'}}>Already have an account?{' '}<span style={{color: '#4285F4'}}>Sign In</span></p>
    </div>
  );
};

export default RegisterForm;
