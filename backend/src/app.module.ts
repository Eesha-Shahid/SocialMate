import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// User-defined Modules
import { StripeModule } from './payments/stripe.module';
import { AuthModule } from './auth/auth.module';

// Other Modules
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'sm_db',}),
    AuthModule, 
    StripeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
