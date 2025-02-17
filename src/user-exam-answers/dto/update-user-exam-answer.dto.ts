// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserExamAnswerDto } from './create-user-exam-answer.dto';

export class UpdateUserExamAnswerDto extends PartialType(
  CreateUserExamAnswerDto,
) {}
