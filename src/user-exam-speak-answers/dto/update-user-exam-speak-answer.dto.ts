// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserExamSpeakAnswerDto } from './create-user-exam-speak-answer.dto';

export class UpdateUserExamSpeakAnswerDto extends PartialType(
  CreateUserExamSpeakAnswerDto,
) {}
