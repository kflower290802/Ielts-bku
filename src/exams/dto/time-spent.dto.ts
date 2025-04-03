import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class TimeSpentDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endTime: Date;
}
