import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePracticeListenDto {
  @ApiProperty({ type: String, format: 'binary', required: true })
  audio: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  practiceId: string;
}
