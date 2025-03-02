// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamListenSectionDto } from './create-exam-listen-section.dto';

export class UpdateExamListenSectionDto extends PartialType(
  CreateExamListenSectionDto,
) {}
