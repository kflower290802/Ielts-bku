// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamWritingDto } from './create-exam-writing.dto';

export class UpdateExamWritingDto extends PartialType(CreateExamWritingDto) {}
