// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

const Facebook = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <div style={{ padding: '20px' }}>
        <h1>Facebook Profile</h1>
        <AccountsBar />
      </div>
    </div>
  );
};

export default Facebook;
