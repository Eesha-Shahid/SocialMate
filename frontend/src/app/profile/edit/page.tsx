'use client'
// Other
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Components
import EditProfileForm from '@/components/EditProfile';

// Services
import UserService from '@/services/UserService';

// Interfaces
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import Sidebar from '@/components/Sidebar';

const EditProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        if (!getCookie('token')) {
            router.push('/');
        } 
        else {
            fetchUserProfile();
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const fetchedUser = await UserService.fetchUserProfile();
            setUser(fetchedUser);
        } catch (error) {
            console.error('Error fetching user profile:', (error as Error).message);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '10rem', paddingTop: '4rem'}}>
                {user && <EditProfileForm user={user} />}
            </div>
        </div>
    );
};

export default EditProfile;
