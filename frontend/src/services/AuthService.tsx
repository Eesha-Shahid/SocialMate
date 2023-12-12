// AuthService.ts
import { GoogleResponse, User } from '@/types/User';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'; 

class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password, });
      return response.data;
    } catch (error) {
      throw new Error('Invalid Credentials');
    }
  }

  async googleSignup(credentialResponse: GoogleResponse){
    try {
      const response = await axios.post("http://localhost:4000/auth/google-signup",
      {
          token: credentialResponse.credential,
      }
      );
      return response.data;
    } catch (error) {
      throw new Error('Google Sign-up failed');
    }
  }

  async googleLogin(credentialResponse: GoogleResponse){
    try {
      const response = await axios.post("http://localhost:4000/auth/google-login",
      {
          token: credentialResponse.credential,
      }
      );
      return response.data;
    } catch (error) {
      throw new Error('Google Sign-in failed');
    }
  }


  async register(username: string, email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }

  async resetPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    try {
      const token = getCookie('token'); 
      const response = await axios.patch(
        `${API_URL}/auth/change-password`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Change password failed');
    }
  }

  async resetForgotPassword(email: string, newPassword: string, confirmPassword: string) {
    try {
      const response = await axios.patch(
        `${API_URL}/auth/change-forgot-password`,
          {
            email,
            newPassword,
            confirmPassword
          }
      );
      return response.data;
    } catch (error) {
      throw new Error('Forgot password Reset failed');
    }
  }

  async forgotPassword(email: string){
    try{
      const response = await axios.post(`${API_URL}/auth/send-forgot-email`, { email });
      return response.data;
    } catch (error) {
      throw new Error('Email Sending Failed');
    }
  }

  async updateUsername(username: string): Promise<User> {
    try{
      const token = getCookie('token'); 
      const response = await axios.patch(
        `${API_URL}/auth/update-username`, 
      { 
        newUsername: username 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    }
    catch(error){
      console.error('Error updating username:', (error as Error).message);
      throw error; 
    }
  }

  async deleteProfile(): Promise<{ message: string }> {
    try {
      const token = getCookie('token'); 

      const response = await fetch(`${API_URL}/auth/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting profile:', (error as Error).message);
      throw error;
    }
  }
}

export default new AuthService();
