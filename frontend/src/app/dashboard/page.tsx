// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '20px' }}>
        <h1>Dashboard</h1>
        <AccountsBar/>
      </div>
    </div>
  );
};

export default Dashboard;
