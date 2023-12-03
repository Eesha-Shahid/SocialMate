import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile, Inject, forwardRef } from '@nestjs/common';
import { RolesAuthGuard } from '../roles-auth.guard';
import { UserType } from '../../common/enums/users.enum';
import { Roles } from '../roles.decorator';
import { StripeService } from '../../payments/services/stripe.service';
import { CredentialsDto } from '../dto/credentials.dto';

@Controller('card')
@UseGuards(RolesAuthGuard)
export class CardController {

    constructor(
        @Inject(forwardRef(() => StripeService)) 
        private readonly stripeService: StripeService,
    ) {}

    @Post('add')
    @Roles(UserType.Standard, UserType.Premium)
    async addCard(
        @Body() credentialsDto : CredentialsDto,
        @Req() req){
        const token = await this.stripeService.createToken(credentialsDto)
        const paymentMethod = await this.stripeService.createPaymentMethod(token.id)
        return await this.stripeService.attachPaymentMethod(paymentMethod.id, req.user.stripeCustomerId)
    }

    @Delete('delete/:id')
    @Roles(UserType.Standard, UserType.Premium)
        async deleteCard(@Param('id') id: string){
        return await this.stripeService.detachPaymentMethod(id)
    }
}
