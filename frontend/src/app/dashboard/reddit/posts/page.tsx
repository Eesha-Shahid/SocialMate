'use client'
import Sidebar from "@/components/Sidebar";
import RedditService from "@/services/RedditService";
import { ScheduledPost } from "@/types/RedditUser";
import { hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RedditPosts = () => {
    const router = useRouter();
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[] | []>([]);

    useEffect(() => {
        const fetchScheduledPosts = async () => {
            if (!hasCookie('token')) {
                router.push('/');
            } 
            else{
                try {
                    const data = await RedditService.getScheduledPosts();
                    setScheduledPosts(data);
                } catch (error) {
                    console.error('Error fetching scheduled posts:', (error as Error).message);
                }
            }
        };

        fetchScheduledPosts();
    }, []);

    const handleDeletePost = async (postId: string) => {
        try {
          await RedditService.deleteScheduledPost(postId);
          const data = await RedditService.getScheduledPosts();
          setScheduledPosts(data);
        } catch (error) {
          console.error('Error deleting post:', error);
        }
    };
    
    return (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ padding: '10rem', paddingTop: '4rem' }}>
            <h1>Your Scheduled Posts</h1>
            <div>
                {scheduledPosts.length > 0 ? (
                <ul style={postListStyle}>
                {scheduledPosts.map((post, index) => (
                    <li key={index} style={postItemStyle}>
                    <p><strong>Subreddit:</strong> {post.redditPost.sr}</p>
                    <p><strong>Title:</strong> {post.redditPost.title}</p>
                    {post.redditPost.url && (
                        <><p style={{display:'inline-block'}}><strong>URL:</strong></p>
                        <Link href={post.redditPost.url}>{post.redditPost.url}</Link>
                        </>
                    )}
                    {post.redditPost.text && (
                        <p><strong>Text:</strong> {post.redditPost.text}</p>
                    )}
                    {post.redditPost.flair_text && (
                        <p><strong>Flair:</strong> {post.redditPost.flair_text}</p>
                    )}
                    <p><strong>Scheduled Time:</strong> {post.scheduledTime.toLocaleString()}</p>
                    <button style={cardButtonStyle} onClick={() => handleDeletePost(post._id.toString())}>
                    Delete
                    </button>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No scheduled posts available.</p>
            )}
            </div>
          </div>
        </div>
    );
};
    
const postListStyle = {
    listStyle: 'none',
    padding: 0,
};

const postItemStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    margin: '8px 0',
    padding: '10px',
    // Add more styles as needed
};

const cardButtonStyle: React.CSSProperties = {
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '1rem',
    fontSize: '1rem',
    backgroundColor:'red',
    color:'white',
    border:'none'
};

export default RedditPosts;