// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamSpeakQuestionDto } from './create-exam-speak-question.dto';

export class UpdateExamSpeakQuestionDto extends PartialType(
  CreateExamSpeakQuestionDto,
) {}
