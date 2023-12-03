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
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';

@Controller('auth')
@UseGuards(RolesAuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
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

  @Patch('upload-photo')
  @Roles(UserType.Standard, UserType.Premium)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file, 'profile-pics');
    const imageUrl = cloudinaryResponse.secure_url;
    return await this.authService.updateUserProfilePic(req.user.id, imageUrl);
  }

  @Delete('remove-photo')
  @Roles(UserType.Standard, UserType.Premium)
  async removeProfilePic(@Req() req) {
    return await this.authService.removeUserProfilePic(req.user.id);
  }

  @Delete('delete')
  @Roles(UserType.Standard, UserType.Premium)
  async delete(@Req() req) {
    await this.authService.deleteById(req.user);
    return { message: 'Account deleted successfully' };
  }
}
