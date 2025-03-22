// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserPracticeDto } from './create-user-practice.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserPracticeDto extends PartialType(CreateUserPracticeDto) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
