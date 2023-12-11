import Sidebar from "@/components/Sidebar";

const RedditPosts = () => {
    return(
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '10rem', paddingTop: '4rem'}}>
                <h1>Your Reddit Posts</h1>
                <p>Pending</p>
            </div>
        </div>
    )
}

export default RedditPosts;