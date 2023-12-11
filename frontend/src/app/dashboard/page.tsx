// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Dashboard</h1>
        <AccountsBar/>
        <p>Pending</p>
      </div>
    </div>
  );
};

export default Dashboard;
