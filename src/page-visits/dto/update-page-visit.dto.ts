// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePageVisitDto } from './create-page-visit.dto';

export class UpdatePageVisitDto extends PartialType(CreatePageVisitDto) {}
