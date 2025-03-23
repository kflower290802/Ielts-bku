// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeListenQuestionDto } from './create-practice-listen-question.dto';

export class UpdatePracticeListenQuestionDto extends PartialType(
  CreatePracticeListenQuestionDto,
) {}
