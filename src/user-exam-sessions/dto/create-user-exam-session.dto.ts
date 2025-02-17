import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserExamSessionDto {
  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  examUserId: string;
}
