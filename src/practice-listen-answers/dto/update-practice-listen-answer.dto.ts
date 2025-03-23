// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeListenAnswerDto } from './create-practice-listen-answer.dto';

export class UpdatePracticeListenAnswerDto extends PartialType(
  CreatePracticeListenAnswerDto,
) {}
