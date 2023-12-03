import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Payment } from '../schemas/payment.schema';
import { RolesAuthGuard } from '../../auth/roles-auth.guard';
import { UserType } from '../../common/enums/users.enum';
import { Roles } from '../../auth/roles.decorator';

@Controller('payments')
@UseGuards(RolesAuthGuard)
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @Roles(UserType.Standard, UserType.Premium)
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req
    ): Promise<Payment> {
    return this.stripeService.create(createPaymentDto, req.user);
  }
}
