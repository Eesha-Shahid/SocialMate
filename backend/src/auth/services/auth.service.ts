import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdateUsernameDto } from '../dto/update-username.dto';
import { StripeService } from '../../payments/services/stripe.service';

@Injectable()
export class AuthService {
  constructor( 
    @Inject(forwardRef(() => StripeService)) 
    private readonly stripeService: StripeService,

    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    //private stripeService: StripeService
  ){}

  // Signup
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    
    const salt = 10;
    const hashedPassword = await bcrypt.hash(signUpDto.password, salt);
    const stripeCustomer = await this.stripeService.createCustomer(signUpDto.username, signUpDto.email);
    const createdUser = await this.userModel.create({
      ...signUpDto,
      stripeCustomerId: stripeCustomer.id,
      password: hashedPassword
    })

    // generate a token
    const token = this.jwtService.sign({ id: createdUser._id })
    return { token };
  }

  // Login
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email })

    //user.password = hashed password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id })
    return { token };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<User | null> {
    const { currentPassword, newPassword } = changePasswordDto;
    const user = await this.userModel.findById(userId);

    // Check if the current password matches the user's stored password
    if (!(await bcrypt.compare(currentPassword, user.password))) {
        throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash and update the new password
    user.password = await bcrypt.hash(newPassword, 10);;

    // Save the updated user document
    return await user.save();
  }

  async updateUsername(userId: string, updateUsernameDto: UpdateUsernameDto): Promise<User | null> {
    const { newUsername } = updateUsernameDto;
    return this.userModel.findByIdAndUpdate(userId, { username: newUsername }, { new: true });
  }  

  async updateUserProfilePic(userId: string, profilePicUrl: string): Promise<void> {
    return await this.userModel.findByIdAndUpdate(userId, { profilePic: profilePicUrl }, { new: true });
  }

  async removeUserProfilePic(userId: string): Promise<void> {
    return await this.userModel.findByIdAndUpdate(userId, { profilePic: null }, { new: true });
  }
  // Delete User
  async deleteById(user: User){

    //Deleting user associated data
    //await this.paymentsService.deleteMany(user);

    //Deleting user
    await this.userModel.findByIdAndDelete({ _id: user._id });
  }
}
