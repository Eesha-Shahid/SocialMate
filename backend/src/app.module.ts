import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// User-defined Modules
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

// Other Modules
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'sm_db',}),
    PaymentsModule, 
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
