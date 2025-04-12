import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserPracticeDto } from './create-user-practice.dto';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserPracticeDto extends PartialType(CreateUserPracticeDto) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  score?: number;
}
