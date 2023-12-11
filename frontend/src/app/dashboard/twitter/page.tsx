'use client'
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const Twitter = () => {
  const [twitterUser, setTwitterUser] = useState(null);
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Twitter</h1>
        <AccountsBar />
        { twitterUser? "": <p>No connected account</p> }
      </div>
    </div>
  );
};

export default Twitter;
