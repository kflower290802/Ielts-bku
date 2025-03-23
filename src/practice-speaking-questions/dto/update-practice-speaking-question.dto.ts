// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeSpeakingQuestionDto } from './create-practice-speaking-question.dto';

export class UpdatePracticeSpeakingQuestionDto extends PartialType(
  CreatePracticeSpeakingQuestionDto,
) {}
