import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserType } from "../../common/enums/users.enum";

@Schema()
export class User {
    [x: string]: any;
    
    @Prop()
    username: string;

    @Prop({ unique: [ true, 'Duplicate email entered' ] })
    email: string;

    @Prop()
    password: string;

    @Prop()
    profilePic: string;

    @Prop({enum: Object.values(UserType), default: UserType.Standard})
    userType: UserType;

    @Prop()
    facebookAccessToken: string;

    @Prop()
    instagramAccessToken: string;

    @Prop()
    twitterAccessToken: string;

    @Prop()
    redditAccessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
