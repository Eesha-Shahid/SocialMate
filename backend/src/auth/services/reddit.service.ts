import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { SocialMediaCredentialsDto } from '../dto/social-media-credentials.dto';
import axios from 'axios';
import { SocialAccessToken } from '../dto/social-access-token.dto';
import { SubredditDto } from '../dto/subreddit.dto';

interface RedditFlair {
    id: string;
    text: string;
    emojiUrl: string;
}

@Injectable()
export class RedditService {
    constructor( 
        @InjectModel(User.name)
        private userModel: Model<User>,
    ){}

    async connectReddit(user, socialMediaCredentialsDto: SocialMediaCredentialsDto): Promise<SocialAccessToken> {
        const { username, password } = socialMediaCredentialsDto;
        const clientId = process.env.REDDIT_CLIENT_ID;
        const clientSecret = process.env.REDDIT_SECRET;
        const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        try {
            const response = await axios.post(
                'https://www.reddit.com/api/v1/access_token',
                `grant_type=password&username=${username}&password=${password}`,
                {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                }
            );
            const accessToken = response.data.access_token;
            user.redditAccessToken = accessToken;
            return await user.save();

        } catch (error) {
            console.error('CONNECT_REDDIT.',error);
        }
    }

    async fetchProfile(user: User){
        try {
            const response = await axios.get('https://oauth.reddit.com/api/v1/me',
                {
                    headers: {
                        Authorization: `Bearer ${user.redditAccessToken}`,
                    },
                }
            );
            return response.data
        } catch (error) {
            console.error('FETCH_REDDIT_PROFILE.',error);
        }
    }

    async viewRedditKarma(user: User): Promise<{}>{
        const userr = await this.userModel.findById(user._id);

        if (!userr) {
            throw new Error('User not found');
        }

        try {
            const response = await axios.get('https://oauth.reddit.com/api/v1/me/karma',
                {
                    headers: {
                        Authorization: `Bearer ${userr.redditAccessToken}`,
                    },
                }
            );
            return response.data
        } catch (error) {
            console.error('FETCH_REDDIT_KARMA.',error);
        }
    }

    async createPostWithLink(user: User, sr: string, title: string, url: string): Promise<any> {
        const formData = new FormData();
        formData.append('sr', sr);
        formData.append('title', title);
        formData.append('url', url);
        formData.append('kind', 'link'); 
        formData.append('resubmit', 'true');
        
        const response = await axios.post(
          'https://oauth.reddit.com/api/submit',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user.redditAccessToken}`,
            },
          }
        );
        const errors: string[] = [];
        var flag = false;
        for (const action of response.data.jquery) {
            if (Array.isArray(action)) {          
                for (const element of action) {          
                    if (Array.isArray(element)) {          
                        for (const innerElement of element) {
                            if (flag){
                                errors.push(innerElement);
                                flag = false
                            }
                            else if (innerElement.startsWith && innerElement.startsWith('.error.')){
                                flag = true
                            }
                        }
                    }
                }
            }
        }

        return {
            success: errors.length === 0,
            ...(errors.length > 0 && { errors }),
        };   
    }

    async createPostWithText(user: User, sr: string, title: string, text: string, flair_id: string, flair_text: string): Promise<any> {
        const formData = new FormData();
        formData.append('sr', sr);
        formData.append('title', title);
        formData.append('text', text);
        formData.append('kind', 'self'); 
        formData.append('resubmit', 'true');
        if (flair_id != ''){
            formData.append('flair_id', flair_id);
            formData.append('flair_text', flair_text);
        }
      
        const response = await axios.post(
          'https://oauth.reddit.com/api/submit',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${user.redditAccessToken}`,
            },
          }
        );

        const errors: string[] = [];
        var flag = false;
        for (const action of response.data.jquery) {
            if (Array.isArray(action)) {          
                for (const element of action) {          
                    if (Array.isArray(element)) {          
                        for (const innerElement of element) {
                            if (flag){
                                errors.push(innerElement);
                                flag = false
                            }
                            else if (innerElement.startsWith && innerElement.startsWith('.error.')){
                                flag = true
                            }
                        }
                    }
                }
            }
        }

        return {
            success: errors.length === 0,
            ...(errors.length > 0 && { errors }),
        };        
    }

    async findFlairs(user: User, subredditDto: SubredditDto): Promise<RedditFlair[]> {
        const { subreddit } = subredditDto
        
        // Check if the subreddit exists
        if (!(await this.checkSubredditExists(subreddit))) {
            throw new Error('Subreddit does not exist');
        }

        try {
            const response = await axios.get(
                `https://oauth.reddit.com/r/${subreddit}/api/link_flair_v2`,
                {
                    headers: {
                        Authorization: `Bearer ${user.redditAccessToken}`
                    }
                }            
            );

            const flairs: RedditFlair[] = response.data.map((flair: any) => {
                // Emoji
                if (flair.richtext && flair.richtext.length > 0) {
                    const richtext = flair.richtext[0];
                    const emojiUrl = flair.richtext[1]?.u || ''; 
                    const background_color = flair.background_color;
                    
                    return {
                        id: flair.id,
                        text: richtext.t,
                        emojiUrl: emojiUrl,
                        background_color: background_color
                    };
                } else {
                    // No emoji
                    return {
                        id: flair.id,
                        text: flair.text,
                        emojiUrl: '',
                        background_color: flair.background_color
                    };
                }
            });
    
            return flairs;
        } catch (error) {
            console.error('FETCH_SUBREDDIT_FLAIRS.',error);
        }
    }

    async checkSubredditExists(subreddit: string): Promise<boolean> {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/about.json`);
            const data = await response.json();
        
            if (response.ok && data && data.kind === 't5') {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('CHECK_SUBREDDIT_EXISTS.',error);
            return false;
        }
    };

    async deleteAccessToken(user: User): Promise<User>{
        const userr = await this.userModel.findById(user._id);
        
        if (!userr) {
            console.error('DELETE_REDDIT_TOKEN.USER_NOT_FOUND');
        }

        user.redditAccessToken = null;
        return await user.save();
    } 
}
