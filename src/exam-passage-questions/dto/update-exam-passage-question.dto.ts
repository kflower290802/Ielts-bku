// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamPassageQuestionDto } from './create-exam-passage-question.dto';

export class UpdateExamPassageQuestionDto extends PartialType(
  CreateExamPassageQuestionDto,
) {}
