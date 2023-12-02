import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserSchema } from './schemas/user.schema';

//Other Modules
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PaymentsModule } from '../payments/payments.module';
import { SocialAuthService } from './services/social-auth.service';
import { SocialAuthController } from './controllers/social-auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRES,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => PaymentsModule),
  ],
  controllers: [AuthController, SocialAuthController],
  providers: [AuthService, SocialAuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
