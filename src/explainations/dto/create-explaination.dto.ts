import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExplainationDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  doc: string;

  @ApiProperty()
  @IsNotEmpty()
  choiceId: string;
}
