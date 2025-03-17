import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateExamListenSectionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;
}
