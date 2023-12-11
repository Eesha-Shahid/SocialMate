'use client'
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const Instagram = () => {
  const [instagramUser, setInstagramUser] = useState(null);
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Instagram</h1>
        <AccountsBar />
        { instagramUser? "": <p>No connected account</p> }
      </div>
    </div>
  );
};

export default Instagram;
