'use client'

// Other
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Interfaces
import { User } from '@/types/User';

// Services
import AuthService from '@/services/AuthService';

interface UserProfileProps {
    user: User;
}  

const EditProfileForm: React.FC<UserProfileProps> = ({ user }) => {
  const router = useRouter();

  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((oldUser) => ({
      ...oldUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async() => {
    try {
        const token = localStorage.getItem('token');
        await AuthService.updateUsername(updatedUser.username, token);
        router.push('/profile');
    } 
    catch (error) {
        console.error('Error saving changes:', (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {user && (
        <>
            <div>
            <label>
              <strong>Username:</strong>
              <input
                type="text"
                value={updatedUser.username}
                name="username"
                onChange={handleFieldChange}
              />
            </label>
          </div>
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Type:</strong> {user.userType}</p>
          </div>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </>
      )}
    </div>
  );
};

export default EditProfileForm;
