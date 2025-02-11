// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateFlashCardDto } from './create-flash-card.dto';

export class UpdateFlashCardDto extends PartialType(CreateFlashCardDto) {}
