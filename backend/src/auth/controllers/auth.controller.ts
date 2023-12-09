import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile, Res, HttpStatus, HttpException } from '@nestjs/common';

// Dtos
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdateUsernameDto } from '../dto/update-username.dto';

// Services
import { AuthService } from '../services/auth.service';

// Auth Guard
import { RolesAuthGuard } from '../roles-auth.guard';
import { UserType } from '../../common/enums/users.enum';
import { Roles } from '../roles.decorator';
import { User } from '../schemas/user.schema';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { EmailDto } from '../dto/email.dto';
import { AddCardDto } from 'src/card/dto/add-card.dto';
import { DeleteCardDto } from 'src/card/dto/delete-card.dto';


@Controller('auth')
@UseGuards(RolesAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly redditService: RedditService,
  ) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ user: User, token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('send-forgot-email')
  async sendEmail(@Body() emailDto: EmailDto){
    return await this.authService.sendResetEmail(emailDto);
  }

  @Get()
  @Roles(UserType.Standard, UserType.Premium)
  async viewProfile(@Req() req){
    return await this.authService.findById(req.user.id);
  }

  @Patch('change-password')
  @Roles(UserType.Standard, UserType.Premium)
  async changePassword(
      @Body() changePasswordDto: ChangePasswordDto,
      @Req() req,
  ): Promise<User> {
      return await this.authService.changePassword(req.user.id, changePasswordDto);
  }

  @Patch('change-forgot-password')
  async changeForgotPassword(
      @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<User> {
      return await this.authService.changeForgotPassword(forgotPasswordDto);
  }

  @Patch('update-username')
  @Roles(UserType.Standard, UserType.Premium)
  async updateUsername(
      @Body() updateUsernameDto: UpdateUsernameDto,
      @Req() req,
  ): Promise<User> {
    return await this.authService.updateUsername(req.user.id, updateUsernameDto);
  }
  
  @Delete('delete')
  @Roles(UserType.Standard, UserType.Premium)
  async delete(@Req() req) {
    await this.authService.deleteById(req.user);
    return { message: 'Account deleted successfully' };
  }

  @Patch('add-card')
  @Roles(UserType.Standard, UserType.Premium)
  async addCard(
    @Req() req,
    @Body() addCardDto:AddCardDto
  ){
    return await this.authService.addCard(req.user.id, addCardDto)
  }

  @Patch('delete-card')
  @Roles(UserType.Standard, UserType.Premium)
  async deleteCard(
    @Req() req,
    @Body() deleteCardDto: DeleteCardDto
  ){
    return await this.authService.deleteCard(req.user.id, deleteCardDto)
  }

  @Get('cards')
  @Roles(UserType.Standard, UserType.Premium)
  async fetchCards(@Req() req){
    return await this.authService.viewCards(req.user.id)
  }


  // @Get('twitter/callback')
  // twitterLoginCallback(
  //     @Req() req, 
  //     @Res() res
  // ) {
  //     console.log("Trying to fetch request token")
  //     console.log("Query:",req.query)
  //     // res.redirect('http://localhost:4000/auth/twitter/callback'); 
  // }
}
