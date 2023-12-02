import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { User } from "../../auth/schemas/user.schema";

@Schema()
export class Payment{
    
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
