'use client'
import { useRouter } from 'next/navigation';
import UserHandler from '@/handlers/UserHandlers';

const Sidebar = () => {
  const { handleLogout } = UserHandler();
  const router = useRouter();

  const navigateTo = (section: string) => {
    router.push(`/${section}`);
  };

  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px', height: '100vh' }}>
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          justify-content: start;
          margin-bottom: 10px;
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.3s;
          border: none;
          outline: none;
          background: none;
          text-align: left;
          border-radius: 5px; /* Adjust the border radius as needed */
        }

        button:hover {
          background-color: #ddd; /* Add your hover color here */
        }

        .icon {
          margin-right: 10px;
          width: 24px; /* Adjust the width as needed */
        }
      `}</style>
      <button onClick={() => navigateTo('dashboard')}>
        <span className="material-icons-round icon">space_dashboard</span> Dashboard
      </button>
      <button onClick={() => navigateTo('profile')}>
        <span className="material-icons-round icon">person_2</span> Profile
      </button>
      <button onClick={() => navigateTo('calendar')}>
        <span className="material-icons-round icon">calendar_today</span> Calendar
      </button>
      <button onClick={() => navigateTo('subscriptions')}>
        <span className="material-icons-round icon">loyalty</span> Subscriptions
      </button>
      <button onClick={() => navigateTo('help')}>
        <span className="material-icons-round icon">question_mark</span> Support
      </button>
      <button onClick={() => navigateTo('settings')}>
        <span className="material-icons-round icon">settings</span> Settings
      </button>
      <button onClick={handleLogout}>
        <span className="material-icons-round icon">logout</span> Log Out
      </button>
    </div>
  );
};

export default Sidebar;