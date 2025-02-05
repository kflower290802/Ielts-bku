// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatelessonDto } from './create-lesson.dto';

export class UpdatelessonDto extends PartialType(CreatelessonDto) {}
