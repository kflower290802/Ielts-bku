import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { PracticeType } from '../pratices.type';

export class CreatePracticeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  topicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true, format: 'binary' })
  image: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Object.values(PracticeType))
  type: PracticeType;
}
