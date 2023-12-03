import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { SocialMediaPlatform } from '../../common/enums/platforms.enum';
import axios from 'axios';
import { SocialAccessToken } from '../dto/social-access-token.dto';
import { SocialMediaCredentialsDto } from '../dto/social-media-credentials.dto';

@Injectable()
export class SocialAuthService {
    constructor(
        @InjectModel('User') 
        private readonly userModel: Model<User>
    ) {}

    async connectReddit(socialMediaCredentialsDto: SocialMediaCredentialsDto): Promise<SocialAccessToken> {
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
        
          const platform = SocialMediaPlatform.REDDIT
          const accessToken = response.data.access_token;
          return { platform, accessToken };

        } catch (error) {
          throw new Error('Failed to obtain Reddit access token');
        }
    }

    async saveAccessToken(user: User, socialAccessToken: SocialAccessToken): Promise<void> {
        
        const { platform, accessToken } = socialAccessToken;
        const userr = await this.userModel.findById(user._id);
        
        if (!userr) {
            throw new Error('User not found');
        }

        switch (platform) {
            case SocialMediaPlatform.FACEBOOK:
                user.facebookAccessToken = accessToken;
                break;
            case SocialMediaPlatform.INSTAGRAM:
                user.instagramAccessToken = accessToken;
                break;
            case SocialMediaPlatform.TWITTER:
                user.twitterAccessToken = accessToken;
                break;
            case SocialMediaPlatform.REDDIT:
                user.redditAccessToken = accessToken;
                break;
            default:
                throw new Error('Invalid platform');
        }

        await user.save();
    }
}
