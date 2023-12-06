'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Interfaces
import { User } from '../types/User';

// Services
import UserService from '@/services/UserService';
import AuthService from '@/services/AuthService';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleRemovePicture = async() => {
    try {
      const token = localStorage.getItem('token');
      await UserService.removeProfilePicture(token);
      window.location.reload();
    } catch (error) {
      console.error('Error removing profle pic', (error as Error).message);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdatePicture = async() => {
    try {
      const token = localStorage.getItem('token');
      if (selectedFile != null){
        await UserService.updateProfilePicture(selectedFile, token);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error removing profle pic', (error as Error).message);
    }
  }

  const navigateTo = (platform: string) => {
    // router.push(`/profile/connect/${platform}`);
    router.push(`/profile/connect/`);
  };

  const handleLogout = async(platform: string) => {
    try {
      const token = localStorage.getItem('token');
      await AuthService.logoutSocial(platform, token)
      router.push(`/profile`);
    } catch (error) {
      console.error('Error logging out: ', (error as Error).message);
    }
  };

  return (
    <div>
      {/* Profile Picture */}
      <p><strong>Profile Picture</strong></p>
      {user.profilePic ? (
        <img src={user.profilePic} alt="Profile" style={{ maxWidth: '200px' }} />
      ) : (
        <p>No profile picture available</p>
      )}
      <br />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpdatePicture}>Update Profile Picture</button>
      <button onClick={handleRemovePicture}>Remove Profile Picture</button>
      
      {/* Basic Info */}
      <p><strong>Basic Info</strong></p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Type:</strong> {user.userType}</p>
      <p><strong>Created on: </strong>{user.createdAt}</p>
      <p><strong>Updated on: </strong>{user.updatedAt}</p>

      {/* Social Integrations */}
      <p><strong>Social Integrations</strong></p>
      <p><strong>Facebook: </strong>
        {user.facebookAccessToken ? 
        (<><button onClick={() => handleLogout('facebook')}>Logout</button></>) : 
        (<button onClick={() => navigateTo('facebook')}>Connect</button>)}
      </p>

      <p><strong>Instagram: </strong>
        {user.instagramAccessToken ? 
        (<><button onClick={() => handleLogout('instagram')}>Logout</button></>) : 
        (<button onClick={() => navigateTo('instagram')}>Connect</button>)}
      </p>

      <p><strong>Twitter: </strong>
        {user.twitterAccessToken ? 
        (<><button onClick={() => handleLogout('twitter')}>Logout</button></>) : 
        (<button onClick={() => navigateTo('twitter')}>Connect</button>)}
      </p>

      <p><strong>Reddit: </strong>
        {user.redditAccessToken ? 
        (<><button onClick={() => handleLogout('reddit')}>Logout</button></>) : 
        (<button onClick={() => navigateTo('reddit')}>Connect</button>)}
      </p>
    </div>
  );
};

export default UserProfile;
