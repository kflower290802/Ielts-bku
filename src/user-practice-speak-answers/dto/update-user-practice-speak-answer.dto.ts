// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserPracticeSpeakAnswerDto } from './create-user-practice-speak-answer.dto';

export class UpdateUserPracticeSpeakAnswerDto extends PartialType(
  CreateUserPracticeSpeakAnswerDto,
) {}
