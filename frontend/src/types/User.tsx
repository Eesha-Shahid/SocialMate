import { Types } from 'mongoose';

export interface User{
    _id: Types.ObjectId | null;
    username: string;
    email: string;
    profilePic: string;
    userType: 'Standard' | 'Premium';
    facebookAccessToken: string | null;
    instagramAccessToken: string | null;
    twitterAccessToken: string | null;
    redditAccessToken: string | null;
    createdAt: any;
    updatedAt: any;
}