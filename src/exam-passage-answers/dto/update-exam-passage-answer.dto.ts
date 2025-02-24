// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamPassageAnswerDto } from './create-exam-passage-answer.dto';

export class UpdateExamPassageAnswerDto extends PartialType(
  CreateExamPassageAnswerDto,
) {}
