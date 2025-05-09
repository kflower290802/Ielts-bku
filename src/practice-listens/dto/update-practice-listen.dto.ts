import { ApiProperty } from '@nestjs/swagger';

export class UpdatePracticeListenDto {
  @ApiProperty({ type: String, format: 'binary', required: true })
  audio: Express.Multer.File;
}
