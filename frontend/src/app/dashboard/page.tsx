// Components
import AccountsBar from '@/components/AccountsBar';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  return (
    <div>
      <Sidebar/>
      <AccountsBar />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
