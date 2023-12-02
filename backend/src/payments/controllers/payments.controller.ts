import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { Payment } from '../schemas/payment.schema';
import { RolesAuthGuard } from '../../auth/roles-auth.guard';
import { UserType } from '../../common/enums/users.enum';
import { Roles } from '../../auth/roles.decorator';

@Controller('payments')
@UseGuards(RolesAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles(UserType.Standard, UserType.Premium)
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req
    ): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto, req.user);
  }

  // @Get()
  // findAll() {
  //   return this.paymentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentsService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentsService.remove(+id);
  // }
}
