import axios from "axios";
import { getCookie } from "cookies-next";

import { Flair, RedditKarma, RedditUser } from "@/types/RedditUser";
import { User } from "@/types/User";

const platform = 'reddit';
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL+`/${platform}`;

class RedditService {
    async connectToReddit(username: string, password: string): Promise<User> {
        try {
          const token = getCookie('token'); 
          const response = await axios.post(`${API_URL}/login`, 
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
          console.error(`Error logging in to ${platform}: `, (error as Error).message);
          throw error;
        }
    }

    async fetchProfile(): Promise<RedditUser>{
      try {
          const token = getCookie('token'); 
          const res = await axios.post(`${API_URL}/profile`,
          {
            token
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error(`Error fetching ${platform} profile:`, (error as Error).message);
        throw error; 
      }
    }
  
    async fetchRedditKarma(): Promise<RedditKarma>{
      try {
        const token = getCookie('token'); 
        const response = await axios.post(
        `${API_URL}/karma`, 
        {
          token
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }, 
        });
        return await response.data;
  
      } catch (error) {
        console.error(`Error fetching ${platform} karma:`, (error as Error).message);
        throw error; 
      }
    }

    async submitPost(sr: string, title: string, text: string, url: string, flair_id: string, flair_text: string): Promise<any> {
        try {
            const token = getCookie('token'); 
            const response = await axios.post(`${API_URL}/submit`, 
            {
                sr, title, text, url, flair_id, flair_text
            }, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return response.data;
        } catch (error) {
            console.error(`Error submitting post on ${platform}:`, (error as Error).message);
            throw error; 
        }
    }

    async getFlairs(subreddit: string): Promise<Flair[]> {
        const token = getCookie('token'); 
        const response = await axios.post(`${API_URL}/flairs`,
            {
                subreddit
            },  
            {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
            }
        );
        return response.data;
    }  
    
    async logout(): Promise<User> {
      try{
        const token = getCookie('token'); 
        const response = await axios.post(`${API_URL}/logout`, 
        {
          token
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }, 
        });
        return await response.data
      }catch(error){
        console.error(`Error logging out from ${platform}:`, (error as Error).message);
        throw error;
      }
    }

}

export default new RedditService;
