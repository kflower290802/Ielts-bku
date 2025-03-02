// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserExamListenAnswerDto } from './create-user-exam-listen-answer.dto';

export class UpdateUserExamListenAnswerDto extends PartialType(
  CreateUserExamListenAnswerDto,
) {}
