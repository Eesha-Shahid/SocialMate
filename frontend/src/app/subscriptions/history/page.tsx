import Sidebar from "@/components/Sidebar";

const History = () => {
    return(
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '10rem', paddingTop: '4rem'}}>
                <h1>Your Past Subscriptions</h1>
            </div>
        </div>
    )
}

export default History;