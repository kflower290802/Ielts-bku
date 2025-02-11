import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FlashCardDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
