// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatenoteDto } from './create-note.dto';

export class UpdatenoteDto extends PartialType(CreatenoteDto) {}
