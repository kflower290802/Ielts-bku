// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserPracticeSessionDto } from './create-user-practice-session.dto';

export class UpdateUserPracticeSessionDto extends PartialType(
  CreateUserPracticeSessionDto,
) {}
