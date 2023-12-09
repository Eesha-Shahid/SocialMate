import { Module } from '@nestjs/common';
import { CardService } from './services/card.service';
import { CardController } from './controllers/card.controller';
import { CardSchema } from './schemas/card.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  controllers: [CardController],
  providers: [CardService],
  exports:[CardService]
})
export class CardModule {}
