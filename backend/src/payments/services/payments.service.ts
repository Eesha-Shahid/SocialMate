import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from '../schemas/payment.schema';
import { User } from '../../auth/schemas/user.schema';
import { Model, Types  } from "mongoose";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
      private readonly paymentModel: Model<Payment>
  ){}

  async create(
    createPaymentDto: CreatePaymentDto,
    user: User
    ): Promise<Payment> {
    
    const data = Object.assign(createPaymentDto, { user: user._id });
    const res = await this.paymentModel.create(data);

    return res;
  }

  async deleteMany(user: User) {
    await this.paymentModel.deleteMany({ user: user._id._id.toString() });
    return { message: "Payment Deleted" }
  }
}
