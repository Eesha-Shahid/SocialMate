import { RedditUser } from "@/types/RedditUser";
import Link from "next/link";

interface RedditUserProps {
    redditUser: RedditUser;
}

interface NumericStatCardProps {
    label: string;
    value: number;
  }
  
const NumericStatCard: React.FC<NumericStatCardProps> = ({ label, value }) => {
    return (
        <div style={cardStyle}>
        <p style={labelStyle}>{label}</p>
        <p style={valueStyle}>{value}</p>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    margin: '10px',
};
  
const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
};

const valueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
};

const RedditProfile: React.FC<RedditUserProps> = ({ redditUser }) => {
    const fieldStyles = {
        border: '1px solid #ccc',
        borderRadius: '15px',
        padding: '5px',
        margin: '8px 0',
        minHeight: '30px', 
        display: 'flex',
        alignItems: 'center',
    };
    
    const premiumSubscriptionStyle: React.CSSProperties = {
        marginBottom: '10px',
        color: redditUser.has_subscribed_to_premium ? 'green' : 'black', 
    };
      
    const verifiedStyle: React.CSSProperties = {
        marginBottom: '10px',
        color: redditUser.verified !== null && redditUser.verified ? 'green' : 'red', 
    };

    return(
        <>
        <div>
            <p>
                <strong>Name</strong>
                <span style={fieldStyles}>{redditUser.name}<span style={verifiedStyle}>{redditUser.verified !== null && redditUser.verified ? 'Verified' : 'Not Verified'}</span></span>
            </p>
            <strong>Display Name</strong>
            <div style={fieldStyles}>        
                <span>{redditUser.subreddit.display_name_prefixed}</span>  
                <Link href={`https://www.reddit.com${redditUser.subreddit.url}`} target='_blank'>
                    <span style={{color:'black'}} className="material-icons-round icon">open_in_new</span>        
                </Link>
            </div>
            {/* <p><strong>Display Name</strong><span style={fieldStyles}>{redditUser.subreddit.display_name_prefixed}</span></p> */}
            {/* <Link href={`https://www.reddit.com${redditUser.subreddit.url}`} target='_blank'>View Profile</Link> */}
            {/* <p><strong>Header Image</strong></p>
            {redditUser.subreddit.header_img ? (
                <img src={redditUser.subreddit.header_img} alt="Header" style={{ maxWidth: '200px' }} />
            ) : (
                <p>No Header available</p>
            )}
            <p><strong>Icon</strong></p>
             {redditUser.subreddit.icon_img ? (
                <img src={redditUser.subreddit.icon_img} alt="Icon" style={{ maxWidth: '200px' }} />
            ) : (
                <p>No Icon available</p>
            )}
            <br /> */}
            <p>
                <strong>Title</strong>
                <span style={fieldStyles}>{redditUser.subreddit.title || 'None'}</span>
            </p>

            <p>
                <strong>Description</strong>
                <span style={fieldStyles}>{redditUser.subreddit.public_description || 'None'}</span>
            </p>
            <p style={premiumSubscriptionStyle}><strong>Type</strong><span style={fieldStyles}>{redditUser.has_subscribed_to_premium ? 'Premium' : 'Standard'}</span></p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <NumericStatCard label="Coins" value={redditUser.coins} />
            <NumericStatCard label="Subscribers" value={redditUser.subreddit.subscribers} />
            <NumericStatCard label="Friends" value={redditUser.gold_creddits} />
            <NumericStatCard label="Total Karma" value={redditUser.total_karma} />
            <NumericStatCard label="Awarder Karma" value={redditUser.awarder_karma} />
            <NumericStatCard label="Awardee Karma" value={redditUser.awardee_karma} />
            <NumericStatCard label="Comment Karma" value={redditUser.comment_karma} />
        </div>
        </>
    )
}



export default RedditProfile;