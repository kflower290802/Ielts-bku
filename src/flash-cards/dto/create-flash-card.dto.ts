import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Lesson } from '../../lessons/domain/lesson';

export class FlashCardItemDto {
  @ApiProperty({
    example: 'Front side of the card',
  })
  @IsString()
  @IsNotEmpty()
  front: string;

  @ApiProperty({
    example: 'Back side of the card',
  })
  @IsString()
  @IsNotEmpty()
  back: string;
}

export class CreateFlashCardDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashCardItemDto)
  cards: FlashCardItemDto[];

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  lessonId: Lesson['id'];
}
