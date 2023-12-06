import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { RolesAuthGuard } from '../roles-auth.guard';
import { UserType } from '../../common/enums/users.enum';
import { Roles } from '../roles.decorator';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { User } from '../schemas/user.schema';
import { UpdateUsernameDto } from '../dto/update-username.dto';

@Controller('auth')
@UseGuards(RolesAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
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
}
