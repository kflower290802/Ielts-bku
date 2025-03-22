// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeReadingAnswerDto } from './create-practice-reading-answer.dto';

export class UpdatePracticeReadingAnswerDto extends PartialType(
  CreatePracticeReadingAnswerDto,
) {}
