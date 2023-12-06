import { RedditUser } from "@/types/RedditUser";
import { User } from "@/types/User";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

class UserService {
  async fetchUserProfile(token: string | null): Promise<User> {
      try {
        const response = await fetch(`${API_URL}/auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
    
        return await response.json();
      } catch (error) {
        console.error('Error fetching user profile:', (error as Error).message);
        throw error; 
      }
  }

  async removeProfilePicture(token: string | null): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/photo/remove`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove profile picture');
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing profile picture:', (error as Error).message);
      throw error; 
    }
  }

  async updateProfilePicture(file: File, token: string | null): Promise<User> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/photo/upload`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile picture:', (error as Error).message);
      throw error; 
    }
  }

  async fetchRedditProfile(token: string | null): Promise<RedditUser>{
    try {
      const response = await axios.post(
        `${API_URL}/social-auth/profile`, 
      {
        platform: "reddit"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      });
      return await response.data;

    } catch (error) {
      console.error('Error fetching reddit profile:', (error as Error).message);
      throw error; 
    }
  }
}

export default new UserService;
