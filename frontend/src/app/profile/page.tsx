'use client'
// Other
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, hasCookie } from 'cookies-next';

// Components
import UserProfile from '@/components/UserProfile';
import Sidebar from '@/components/Sidebar';

// Interfaces
import useUser from '@/hooks/useUser';

import UserService from '@/services/UserService';

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const fetchUserProfile = async() => {
    try {
      const fetchedUser = await UserService.fetchUserProfile();
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user profile:', (error as Error).message);
    }
  };

  useEffect(() => {
    if (!hasCookie('token')) {
      router.push('/');
    } else {
      fetchUserProfile();
    }
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginRight: '20px' }}>Profile</h1>
        {user && <UserProfile user={user} />}
      </div>
    </div>
  );
};




export default Profile;
