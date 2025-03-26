// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserPracticeListenAnswerDto } from './create-user-practice-listen-answer.dto';

export class UpdateUserPracticeListenAnswerDto extends PartialType(
  CreateUserPracticeListenAnswerDto,
) {}
