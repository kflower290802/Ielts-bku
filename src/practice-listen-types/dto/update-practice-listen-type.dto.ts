// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeListenTypeDto } from './create-practice-listen-type.dto';

export class UpdatePracticeListenTypeDto extends PartialType(
  CreatePracticeListenTypeDto,
) {}
