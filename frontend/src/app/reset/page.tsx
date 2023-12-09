'use client'
import useUser from "@/hooks/useUser";
import AuthService from "@/services/AuthService";
import { ChangePassword } from "@/types/User";
import { setCookie } from "cookies-next";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Forgot() {
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
    
    return(
        <div style={{ textAlign: 'center' }}>
        <h1>Reset Password</h1>
            <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <Formik
                    initialValues={{ currentPassword:"", newPassword: "", confirmPassword: "" }}
                    onSubmit={( values: ChangePassword, { setSubmitting }: FormikHelpers<ChangePassword>) => {
                    setTimeout(() => {
                        handleSubmit(values);
                        setSubmitting(false);
                    }, 500);
                    }}
                >
                    <Form style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                    <label htmlFor='newPassword' style={{ textAlign: 'left', marginBottom: '5px' }}>New Password </label>
                    <Field id="newPassword" type="password" name="newPassword" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
                    <label htmlFor='confirmPassword' style={{ textAlign: 'left', marginBottom: '5px' }}>Confirm Password </label>
                    <Field id="confirmPassword" type="password" name="confirmPassword" required style={{ padding: '8px', borderRadius: '5px', marginBottom: '10px' }}/>
                    <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Change Password</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}