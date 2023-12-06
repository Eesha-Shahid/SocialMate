'use client'
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const navigateTo = (section: string) => {
    router.push(`/${section}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };
  
  return (
    <div>
        <button onClick={() => navigateTo('dashboard')}>Dashboard</button>
        <button onClick={() => navigateTo('profile')}>Profile</button>
        <button onClick={() => navigateTo('calendar')}>Calendar</button>
        <button onClick={() => navigateTo('subscriptions')}>Subscriptions</button>
        <button onClick={() => navigateTo('help')}>Help and Support</button>
        <button onClick={() => navigateTo('settings')}>Settings</button>
        <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Sidebar;
