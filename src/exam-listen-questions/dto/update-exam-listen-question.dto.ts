// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamListenQuestionDto } from './create-exam-listen-question.dto';

export class UpdateExamListenQuestionDto extends PartialType(
  CreateExamListenQuestionDto,
) {}
