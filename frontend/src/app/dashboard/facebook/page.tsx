'use client'
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const Facebook = () => {
  const [facebookUser, setFacebookUser] = useState(null);
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Facebook</h1>
        <AccountsBar />
        { facebookUser? "": <p>No connected account</p> }
      </div>
    </div>
  );
};

export default Facebook;
