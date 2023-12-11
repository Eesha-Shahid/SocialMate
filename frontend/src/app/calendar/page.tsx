// Components
import Sidebar from "@/components/Sidebar";

const Calendar = () => {

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <h1>Calendar</h1>
        <p>Pending</p>
      </div>
    </div>
  );
};

export default Calendar;
