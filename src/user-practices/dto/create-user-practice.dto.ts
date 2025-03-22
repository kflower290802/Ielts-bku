import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../../users/domain/user';
import { Practice } from '../../practices/domain/practice';

export class CreateUserPracticeDto {
  @ApiProperty()
  @IsNotEmpty()
  user: User;

  @ApiProperty()
  @IsNotEmpty()
  practice: Practice;
}
