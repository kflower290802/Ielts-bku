// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeReadingTypeDto } from './create-practice-reading-type.dto';

export class UpdatePracticeReadingTypeDto extends PartialType(
  CreatePracticeReadingTypeDto,
) {}
