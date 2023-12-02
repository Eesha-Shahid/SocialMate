import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Payment } from '../../payments/schemas/payment.schema';
import { PaymentsService } from '../../payments/services/payments.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdateUsernameDto } from '../dto/update-username.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => PaymentsService)) 
    private readonly paymentsService: PaymentsService,

    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ){}

  // Signup
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword
    })

    // generate a token
    const token = this.jwtService.sign({ id: user._id })

    return { token };
  }

  // Login
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email })

    // Incorrect Email
    if (!user){
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    // Incorrect Password
    if (!isPasswordMatched){
      throw new UnauthorizedException('Invalid email or password')
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

  // Delete User
  async deleteById(user: User){

    //Deleting user associated data
    await this.paymentsService.deleteMany(user);

    //Deleting user
    await this.userModel.findByIdAndDelete({ _id: user._id });
  }
}
