'use client'
// Other
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import UserProfile from '@/components/UserProfile';
import Sidebar from '@/components/Sidebar';

// Services
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';

// Interfaces
import { User } from '@/types/User';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
    } else {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async() => {
    try {
      const token = localStorage.getItem('token');
      const fetchedUser = await UserService.fetchUserProfile(token);
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user profile:', (error as Error).message);
    }
  };

  const handleDelete = async() => {
    try{
      const token = localStorage.getItem('token');
      await AuthService.deleteProfile(token);
      localStorage.removeItem('token');
      router.push('/')
    }
    catch(error){
      console.error('Error deleting user profile:', (error as Error).message);
    }
  }

  return (
    <div>
      <Sidebar/>
      <h1>Profile</h1>
      {user && <UserProfile user={user} />}
      <button onClick={() => router.push('/profile/edit')}>Edit Profile</button>
      <br />
      <button onClick={() => router.push('/profile/reset-password')}>Reset Password</button>
      <br />
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default Profile;
