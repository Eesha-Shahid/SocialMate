// Components
'use client'
import { useRouter } from 'next/navigation';

const AccountsBar = () => {
  const router = useRouter();

  const facebookIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png";
  const instaIcon = "https://p7.hiclipart.com/preview/145/243/586/logo-computer-icons-clip-art-instagram-layout.jpg";
  const twitterIcon = "https://freelogopng.com/images/all_img/1690643640twitter-x-icon-png.png";
  const redditIcon = "https://toppng.com/uploads/preview/reddit-icon-reddit-logo-transparent-115628752708pqmsy4kgm.png";

  const navigateTo = (section: string) => {
    router.push(`/dashboard/${section}`);
  };

  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <button style={buttonStyles} onClick={() => navigateTo('facebook')}>
        <img src={facebookIcon} alt="Facebook" style={{ width: '20px', marginRight: '5px' }} />
        Facebook
      </button>
      <button style={buttonStyles} onClick={() => navigateTo('instagram')}>
        <img src={instaIcon} alt="Instagram" style={{ width: '20px', marginRight: '5px' }} />
        Instagram
      </button>
      <button style={buttonStyles} onClick={() => navigateTo('twitter')}>
        <img src={twitterIcon} alt="Twitter" style={{ width: '20px', marginRight: '5px' }} />
        Twitter
      </button>
      <button style={buttonStyles} onClick={() => navigateTo('reddit')}>
        <img src={redditIcon} alt="Reddit" style={{ width: '20px', marginRight: '5px' }} />
        Reddit
      </button>
    </div>
  );
};

const buttonStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default AccountsBar;
