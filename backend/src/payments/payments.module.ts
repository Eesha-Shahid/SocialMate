import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controllers/payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './schemas/payment.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
