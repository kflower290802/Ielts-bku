import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  endDate: Date;
}
