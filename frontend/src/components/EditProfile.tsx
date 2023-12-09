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
        await AuthService.updateUsername(updatedUser.username);
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
            <label style={{textAlign: 'left', marginBottom: '5px'}}>
              <strong>Username</strong>
              <input
                style={fieldStyles}
                type="text"
                value={updatedUser.username}
                name="username"
                onChange={handleFieldChange}
              />
            </label>
          </div>
          <div>
            <p><strong>Email</strong><span style={{...fieldStyles, color:'grey'}}>{user.email}</span></p>
            <p><strong>Type</strong><span style={{...fieldStyles, color:'grey'}}>{user.userType}</span></p>
          </div>
          <button style={buttonStyle} onClick={handleSaveChanges}>Save Changes</button>
        </>
      )}
    </div>
  );
};

const fieldStyles = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '5px',
  margin: '8px 0',
  minHeight: '30px', 
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: 'black',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '20px',
};

export default EditProfileForm;
