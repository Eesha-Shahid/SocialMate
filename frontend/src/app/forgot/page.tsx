// Components
'use client'
import AuthService from "@/services/AuthService";
import { Field, Form, Formik, FormikHelpers } from "formik";

type forgotPasswordInput = {
  email: string;
}

export default function Forgot() {

  const emailIcon = "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png";
  const handleSubmit = async(values: forgotPasswordInput) => {
    try {
      await AuthService.forgotPassword(values.email);
    } catch (error) {
      console.error('Sign-in error:', (error as Error).message);
    }
  } 

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Forgot Password</h1>
      <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <Formik
          initialValues={{ email: ""}}
          onSubmit={( values: forgotPasswordInput, { setSubmitting }: FormikHelpers<forgotPasswordInput>) => {
            setTimeout(() => {
              handleSubmit(values);
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
            <label htmlFor='email'style={{ textAlign: 'left', marginBottom: '5px' }}>Email:</label>
            <Field id="email" type="email" name="email" placeholder="Enter email" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
            <br /><br />
            <button type="submit" style={{ marginTop: '10px', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '95%' }}>
              <img src={emailIcon} alt="Google Icon" style={{  width: '20px', height: '20px', marginRight: '10px' }} />
              Send Reset Link
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
