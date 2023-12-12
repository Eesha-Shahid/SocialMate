import { Types } from 'mongoose';

export type User = {
    _id: Types.ObjectId | null;
    username: string;
    email: string;
    profilePic: string;
    userType: 'Standard' | 'Premium';
    googleAuth: boolean;
    facebookAccessToken: string | null;
    instagramAccessToken: string | null;
    twitterAccessToken: string | null;
    redditAccessToken: string | null;
    cards: CardInfomration[];
    payments: PaymentInformation[];
    createdAt: any;
    updatedAt: any;
}

export type AuthUser = {
    token: string,
    user: User
}

export type TLogin = {
    email: string;
    password: string;
}

export type TSignup = {
    username: string;
    email: string;
    password: string;
}

export type TSocialLogin = {
    username: string;
    password: string;
}

export type ChangePassword = {
    currentPassword :string;
    newPassword:string;
    confirmPassword: string;
}

export type CardInfomration = {
    _id: Types.ObjectId;
    default: boolean;
    cardNumber: string;
    expMonth: number;
    expYear: number;
    cvc: string;
}

export type PaymentInformation = {
    _id: Types.ObjectId;
    card: string;
    amount: Number;
    currency: String
    payment_method: String
    createdAt: any

}

export type GoogleResponse = {
    clientId?: string;
    credential?: string;
    select_by?: string;
}

export type AuthResponse = {
    data?: AuthUser;
}