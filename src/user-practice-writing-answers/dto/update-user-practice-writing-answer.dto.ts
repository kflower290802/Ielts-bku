// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserPracticeWritingAnswerDto } from './create-user-practice-writing-answer.dto';

export class UpdateUserPracticeWritingAnswerDto extends PartialType(
  CreateUserPracticeWritingAnswerDto,
) {}
