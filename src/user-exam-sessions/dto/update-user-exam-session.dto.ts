// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserExamSessionDto } from './create-user-exam-session.dto';

export class UpdateUserExamSessionDto extends PartialType(
  CreateUserExamSessionDto,
) {}
