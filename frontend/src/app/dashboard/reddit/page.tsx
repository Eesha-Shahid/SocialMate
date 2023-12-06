'use client'
// Other
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';

// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

// Interfaces
import { RedditUser } from '@/types/RedditUser';

// Services
import UserService from '@/services/UserService';
import Link from 'next/link';

const Reddit = () => {
  const router = useRouter();
  const [redditUser, setRedditUser] = useState<RedditUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
    } else {
      fetchRedditProfile();
    }
  }, []);

  const fetchRedditProfile = async() => {
    try {
      const token = localStorage.getItem('token');
      const fetchedUser = await UserService.fetchRedditProfile(token);
      setRedditUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user profile:', (error as Error).message);
    }
  };

  return (
    <div>
      <Sidebar/>
      <AccountsBar />
      <h1>Reddit</h1>
      {redditUser && (
        <>
          <p><strong>Name: </strong>{redditUser.name}</p>
          <p><strong>Display Name: </strong>{redditUser.subreddit.display_name}</p>
          <p><strong>Display Name (Prefixed): </strong>{redditUser.subreddit.display_name_prefixed}</p>
          <p><strong>Verified: </strong>{redditUser.verified}</p>
          <Link href={`https://www.reddit.com${redditUser.subreddit.url}`} target='_blank'>View Profile</Link>
          <p><strong>Header Image</strong></p>
          {redditUser.subreddit.header_img ? (
            <img src={redditUser.subreddit.header_img} alt="Header" style={{ maxWidth: '200px' }} />
          ) : (
            <p>No Header available</p>
          )}
          <br />
          <p><strong>Title: </strong>{redditUser.subreddit.title}</p>
          <p><strong>Description: </strong>{redditUser.subreddit.description}</p>
          <p><strong>Public Description:</strong>{redditUser.subreddit.public_description}</p>
          <p><strong>Coins: </strong>{redditUser.coins}</p>
          <p><strong>Icon</strong></p>
          {redditUser.subreddit.icon_img ? (
            <img src={redditUser.subreddit.icon_img} alt="Icon" style={{ maxWidth: '200px' }} />
          ) : (
            <p>No Icon available</p>
          )}
          <br />
          <p><strong>Subscribers: </strong>{redditUser.subreddit.subscribers}</p>
          {/* <p><strong>Gold Subscription: </strong>{redditUser.has_gold_subscription}</p>
          <p><strong>Gold Credits: </strong>{redditUser.gold_creddits}</p> */}
          <p><strong>Friends: </strong>{redditUser.num_friends}</p>
          {/* <p><strong>Premium Subscription: </strong>{redditUser.has_subscribed_to_premium}</p> */}
          <p><strong>Total Karma: </strong>{redditUser.total_karma}</p>
          <p><strong>Awarder Karma: </strong>{redditUser.awarder_karma}</p>
          <p><strong>Awardee Karma: </strong>{redditUser.awardee_karma}</p>
          <p><strong>Comment Karma: </strong>{redditUser.comment_karma}</p>
        </>
      )}
    </div>
  );
};

export default Reddit;
