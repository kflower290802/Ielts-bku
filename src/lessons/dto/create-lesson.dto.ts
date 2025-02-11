import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '../lessons.type';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FlashCardItemDto } from '../../flash-cards/dto/create-flash-card.dto';
import { Expose, Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(LessonType, {
    message: 'InvalidLessonType',
  })
  type: LessonType;

  @ApiProperty()
  @IsOptional()
  blogId?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FlashCardItemDto)
  @Expose()
  cards?: FlashCardItemDto[];
}
