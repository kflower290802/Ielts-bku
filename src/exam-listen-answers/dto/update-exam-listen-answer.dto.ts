// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamListenAnswerDto } from './create-exam-listen-answer.dto';

export class UpdateExamListenAnswerDto extends PartialType(
  CreateExamListenAnswerDto,
) {}
