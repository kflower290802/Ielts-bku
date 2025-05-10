import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateExamSpeakPartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;
}
