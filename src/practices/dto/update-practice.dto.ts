// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeDto } from './create-practice.dto';

export class UpdatePracticeDto extends PartialType(CreatePracticeDto) {}
