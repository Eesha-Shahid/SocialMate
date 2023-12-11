import Sidebar from "@/components/Sidebar";
import SocialAuthForm from "@/components/SocialAuthForm";

const Connect = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <SocialAuthForm />
      </div>
    </div>
  );
};

export default Connect;
