import { CardInfomration, PaymentInformation, User } from "@/types/User";
import axios from "axios";
import { getCookie } from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

class UserService {
  async fetchUserProfile(): Promise<User> {
      try {
        const token = getCookie('token'); 
        const response = await fetch(`${API_URL}/auth`, {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: {
            revalidate: 20, 
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

  async removeProfilePicture(): Promise<User> {
    try {
      const token = getCookie('token'); 

      const response = await fetch(`${API_URL}/photo/remove`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error removing profile picture:', (error as Error).message);
      throw error; 
    }
  }

  async updateProfilePicture(file: File): Promise<User> {
    try {
      const token = getCookie('token'); 
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

  async getCardInformation(): Promise<CardInfomration[] | []>{
    try {
      const token = getCookie('token');
      const response = await axios.get(`${API_URL}/auth/cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Fetching cards failed');
    }
  }  

  async addCardInformation(cardNumber: string, expMonth: number, expYear: number, cvc: string){
    try {
      const token = getCookie('token'); 
      const response = await axios.patch(`${API_URL}/auth/add-card`, 
      {
        cardNumber,
        expMonth,
        expYear,
        cvc
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Adding Card failed');
    }
  }

  async deleteCardInformation(cardId: string): Promise<void> {
    try {
      const token = getCookie('token'); 
      const reponse = await axios.patch(`${API_URL}/auth/delete-card`, 
      {
        cardId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return reponse.data
    } catch (error) {
      throw new Error('Deleting Card failed');
    }
  }

  async setDefaultCard(cardId: string): Promise<void> {
    try {
      const token = getCookie('token'); 
      const reponse = await axios.patch(`${API_URL}/auth/set-default-card`, 
      {
        cardId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return reponse.data
    } catch (error) {
      throw new Error('Deleting Card failed');
    }
  }

  async getPaymentInformation(): Promise<PaymentInformation[] | []>{
    try {
      const token = getCookie('token');
      const response = await axios.get(`${API_URL}/auth/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Fetching cards failed');
    }
  }

  async subscribe(): Promise<User> {
    try {
      const token = getCookie('token'); 
      const response = await fetch(`${API_URL}/auth/subscribe`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Subscription failed');
    }
  }

  async cancelSubscription(): Promise<User> {
    try {
      const token = getCookie('token'); 
      const response = await fetch(`${API_URL}/auth/unsubscribe`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Canceling subscription failed');
    }
  }
}

export default new UserService;
