// Components
'use client'
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

const AccountsBar = () => {

  const router = useRouter();

  const navigateTo = (section: string) => {
    router.push(`/dashboard/${section}`);
  };

  return (
    <div>
      <button onClick={() => navigateTo('facebook')}>Facebook</button>
      <button onClick={() => navigateTo('twitter')}>Twitter</button>
      <button onClick={() => navigateTo('instagram')}>Instagram</button>
      <button onClick={() => navigateTo('reddit')}>Reddit</button>
    </div>
  );
};

export default AccountsBar;
