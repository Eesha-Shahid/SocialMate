'use client'
import CardsInformation from "@/components/CardsInformation";
import PlanInformation from "@/components/PlanInformation";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const Subscriptions = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '10rem', paddingTop: '4rem'}}>
        <CardsInformation/>
        <PlanInformation/>
        <button style={buttonStyle}>Enable Subscription Renewal</button>
        <Link href="/subscriptions/history"><button style={buttonStyle}>View Billing History</button></Link>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: 'black',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '20px',
};
  
export default Subscriptions;

