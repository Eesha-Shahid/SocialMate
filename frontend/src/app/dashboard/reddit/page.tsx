'use client'
// Other
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import { getCookie } from 'cookies-next';

// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

// Interfaces
import { RedditKarma, RedditUser } from '@/types/RedditUser';

// Services
import RedditProfile from '@/components/RedditProfile';
import RedditService from '@/services/RedditService';
import useUser from '@/hooks/useUser';
import UserService from '@/services/UserService';


const Reddit = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [redditUser, setRedditUser] = useState<RedditUser | null>(null);
  const [redditKarma, setRedditKarma] = useState<RedditKarma | null>(null);

  const fetchUserProfile = async() => {
    try {
      const fetchedUser = await UserService.fetchUserProfile();
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user profile:', (error as Error).message);
    }
  };

  useEffect(() => {
    if (getCookie('token')){
        fetchUserProfile()
        if (user?.redditAccessToken != undefined){
          fetchRedditProfile();
          fetchRedditKarma();
        }
    }
    else{
      console.error("No User Tokentoken")
    }
  }, []);
  
  const fetchRedditProfile = async() => {
    try {
      const data = await RedditService.fetchProfile();
      setRedditUser(data);
    } catch (error) {
      console.error('Error fetching reddit profile:', (error as Error).message);
    }
  };

  const fetchRedditKarma = async() => {
    try {
      const data = await RedditService.fetchRedditKarma();
      setRedditKarma(data);
    } catch (error) {
      console.error('Error fetching Reddit Karma:', (error as Error).message);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Reddit</h1>
        <AccountsBar />
        {redditUser != null ? (
          <>
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
            <button style={buttonStyle} onClick={() => router.push('/dashboard/reddit/posts')}>View Scheduled Posts</button>
            <button style={buttonStyle} onClick={() => router.push('/dashboard/reddit/schedule')}>Schedule New Post</button>
            {/* <button style={buttonStyle} onClick={() => router.push('/dashboard/reddit/posts')}>View Posts</button> */}
            <button style={buttonStyle} onClick={() => router.push('/dashboard/reddit/create')}>Create Post</button>
          </div>
          <RedditProfile redditUser={redditUser} />
          </>
        ) : (
          <p>No connected account</p>
        )}
        
        {/* {redditKarma && (
          <>
            <p>
              <strong>Karma Kind: </strong>
              {redditKarma.kind}
            </p>
            <p>
              <strong>Karma Data: </strong>
              {redditKarma.data}
            </p>
          </>
        )} */}
      </div>
    </div>
  );
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

export default Reddit;
