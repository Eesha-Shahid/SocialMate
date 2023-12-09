'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Interfaces
import { User } from '../types/User';

// Services
import UserService from '@/services/UserService';

// Handlers
import UserHandler from '@/handlers/UserHandlers';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {

  const router = useRouter();
  const facebookIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png";
  const instaIcon = "https://p7.hiclipart.com/preview/145/243/586/logo-computer-icons-clip-art-instagram-layout.jpg";
  const twitterIcon = "https://freelogopng.com/images/all_img/1690643640twitter-x-icon-png.png";
  const redditIcon = "https://toppng.com/uploads/preview/reddit-icon-reddit-logo-transparent-115628752708pqmsy4kgm.png";

  const defaultPic = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
  const { handleRemovePicture, handleSocialLogout } = UserHandler();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { handleDelete } = UserHandler();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdatePicture = async() => {
    try {
      if (selectedFile != null){
        await UserService.updateProfilePicture(selectedFile);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating profle pic', (error as Error).message);
    }
  }

  const navigateTo = (platform: string) => {
    router.push(`/profile/connect/`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  
      {/* Basic Info and Social Integrations */}
      <div>
        {/* Profile Picture */}
        <div style={{ marginRight: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px' }}>
              {user.profilePic ? 
                (<img src={user.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', justifyContent:'center' }} />) : 
                (<img src={defaultPic} alt="Default Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)
              }
            </div>
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange}/>
          </div>
          <br />
          <button style={buttonStyle} onClick={handleUpdatePicture}>Update Profile Picture</button>
          <button style={buttonStyle} onClick={handleRemovePicture}>Remove Profile Picture</button>
        </div>
        
        <div style={{ marginRight: '20px' }}>
          <p><strong>Username</strong> <span style={fieldStyles}>{user.username}</span></p>
          <p><strong>Email</strong> <span style={fieldStyles}>{user.email}</span></p>
          <p><strong>Type</strong> <span style={fieldStyles}>{user.userType}</span></p>
          <p><strong>Created on </strong><span style={fieldStyles}>{user.createdAt}</span></p>
          <p><strong>Last Updated </strong><span style={fieldStyles}>{user.updatedAt}</span></p>
        </div>

        <button style={buttonStyle} onClick={() => router.push('/profile/edit')}>Edit Profile</button>
        <button style={buttonStyle} onClick={() => router.push('/profile/reset')}>Change Password</button>
        <button style={{ ...buttonStyle, ...deleteStyle }}  onClick={handleDelete}>Delete Profile</button>

        {/* Social Integrations */}
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          {/* Facebook */}
          {user.facebookAccessToken ? 
            (<><button style={socialButton} onClick={() => handleSocialLogout('facebook')}>
              <img src={facebookIcon} alt="Facebook" style={{ width: '20px', marginRight: '5px' }} />Logout</button></>) : 
            (<button style={socialButton} onClick={() => navigateTo('facebook')}>
              <img src={facebookIcon} alt="Facebook" style={{ width: '20px', marginRight: '5px' }} />Connect</button>)}


          {/* Instagram */}
          {user.instagramAccessToken ? 
            (<><button style={socialButton} onClick={() => handleSocialLogout('instagram')}>
              <img src={instaIcon} alt="Instagram" style={{ width: '20px', marginRight: '5px' }} />Logout</button></>) : 
            (<button style={socialButton} onClick={() => navigateTo('instagram')}>
              <img src={instaIcon} alt="Instagram" style={{ width: '20px', marginRight: '5px' }} />Connect</button>)}

          {/* Twitter */}
          {user.twitterAccessToken ? 
            (<><button style={socialButton} onClick={() => handleSocialLogout('twitter')}>
              <img src={twitterIcon} alt="Twitter" style={{ width: '20px', marginRight: '5px' }} />Logout</button></>) : 
            (<button style={socialButton} onClick={() => navigateTo('twitter')}>
              <img src={twitterIcon} alt="Twitter" style={{ width: '20px', marginRight: '5px' }} />Connect</button>)}

          {/* Reddit */}
          {user.redditAccessToken ? 
            (<><button style={socialButton} onClick={() => handleSocialLogout('reddit')}>
              <img src={redditIcon} alt="Reddit" style={{ width: '20px', marginRight: '5px' }} />Logout</button></>) : 
            (<button style={socialButton} onClick={() => navigateTo('reddit')}>
              <img src={redditIcon} alt="Reddit" style={{ width: '20px', marginRight: '5px' }} />Connect</button>)}
        </div>
      </div>

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

const deleteStyle: React.CSSProperties = {
  backgroundColor: '#f44336'
}

const socialButton = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  marginTop: '9px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default UserProfile;
