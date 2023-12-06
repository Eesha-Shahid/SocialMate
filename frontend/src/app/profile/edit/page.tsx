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

const EditProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/');
        } 
        else {
            fetchUserProfile();
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const fetchedUser = await UserService.fetchUserProfile(token);
            setUser(fetchedUser);
        } catch (error) {
            console.error('Error fetching user profile:', (error as Error).message);
        }
    };

    return (
        <div>
        {user && <EditProfileForm user={user} />}
        </div>
    );
};

export default EditProfile;
