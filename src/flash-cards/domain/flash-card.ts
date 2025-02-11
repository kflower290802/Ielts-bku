import { ApiProperty } from '@nestjs/swagger';
import { Card } from '../flash-cards.type';
import { Lesson } from '../../lessons/domain/lesson';

export class FlashCard {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  lesson: Lesson;

  @ApiProperty()
  cards: Card[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
