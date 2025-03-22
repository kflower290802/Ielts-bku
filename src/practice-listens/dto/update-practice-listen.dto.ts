// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePracticeListenDto } from './create-practice-listen.dto';

export class UpdatePracticeListenDto extends PartialType(
  CreatePracticeListenDto,
) {}
