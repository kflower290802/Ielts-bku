// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateHistoryDto } from './create-history.dto';

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {}
