'use client'
import React from 'react';
import { TSocialLogin } from '@/types/User';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import UserHandler from '@/handlers/UserHandlers';

const SocialAuthForm = () => {
    const {handleSocialSignIn} = UserHandler();

    return (
        <div>
        <h2>Social Login</h2>
        <Formik
            initialValues={{ username: "", password: "",}}
            onSubmit={( values: TSocialLogin, { setSubmitting }: FormikHelpers<TSocialLogin>) => {
            setTimeout(() => {
                handleSocialSignIn(values);
                setSubmitting(false);
            }, 500);
            }}
        >
            <Form>
                <label htmlFor='username'>Username</label>
                <Field style={fieldStyles} id="username" type="text" name="username" placeholder='Enter username' required/>
                <br />
                <label htmlFor='password'>Password</label>
                <Field style={fieldStyles} id="password" type="password" name="password" required/>
                <br />
                <button style={buttonStyle} type="submit">Login</button>
            </Form>
            
        </Formik>
        </div>
    );
};

const fieldStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '5px',
    paddingRight:'120px',
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

export default SocialAuthForm;
