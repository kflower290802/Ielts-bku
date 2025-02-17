import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserExamSessionDto {
  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  endTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  examUserId: string;
}
