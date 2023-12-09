import Sidebar from "@/components/Sidebar";

const History = () => {
    return(
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '20px' }}>
                <h1>Your Past Subscriptions</h1>
            </div>
        </div>
    )
}

export default History;