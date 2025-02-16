// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateExamPassageDto } from './create-exam-passage.dto';

export class UpdateExamPassageDto extends PartialType(CreateExamPassageDto) {}
