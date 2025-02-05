// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { Createquestion_resultDto } from './create-question-result.dto';

export class Updatequestion_resultDto extends PartialType(
  Createquestion_resultDto,
) {}
