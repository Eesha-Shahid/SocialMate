import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from '../schemas/card.schema';
import { AddCardDto } from '../dto/add-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';

@Injectable()
export class CardService {
    @InjectModel(Card.name)
    private cardModel: Model<Card>

    async createCard(addCardDto: AddCardDto): Promise<Card | null>{
        return await this.cardModel.create(addCardDto)
    }

    async deleteCard(card: Card){
        await this.cardModel.findByIdAndDelete({ _id: card._id })
    }
}
