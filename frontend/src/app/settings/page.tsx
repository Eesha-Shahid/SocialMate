// Components
import Sidebar from "@/components/Sidebar";

const Settings = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: '10rem', paddingTop: '4rem'}}>
          <h1>Settings</h1>
          <p>Pending</p>
        </div>
      </div>
    );
  };
  
export default Settings;
  