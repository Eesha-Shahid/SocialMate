// AuthService.ts
import { User } from '@/types/User';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'; // Default to a local URL

class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Sign-in failed');
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
      throw new Error('Sign-in failed');
    }
  }

  async resetPassword(currentPassword: string, newPassword: string, confirmPassword: string, token: string | null) {
    try {
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

  async updateUsername(username: string, token: string | null): Promise<User> {
    try{
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

  async deleteProfile(token: string | null): Promise<{ message: string }> {
    try {
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

  async connectToReddit(username: string, password: string, token: string | null): Promise<User> {
    try {
      const response = await axios.post(
        `${API_URL}/social-auth/reddit`, 
      { 
        username: username,
        password: password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.data
    } 
    catch (error) {
      console.error('Error logging in to Reddit:', (error as Error).message);
      throw error;
    }
  }

  async logoutSocial(platform: string, token: string | null): Promise<User> {
    try{
      const response = await axios.post(
        `${API_URL}/social-auth/logout`, 
      {
        platform
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      });
      return await response.data
    }catch(error){
      console.error('Error logging out:', (error as Error).message);
      throw error;
    }
  }
}

export default new AuthService();
