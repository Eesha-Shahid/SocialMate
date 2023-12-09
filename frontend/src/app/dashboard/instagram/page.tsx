// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

const Instagram = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style={{ padding: '20px' }}>
        <h1>Instagram Profile</h1>
        <AccountsBar />
      </div>
    </div>
  );
};

export default Instagram;
