import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: 90 })
  score: number;
}
