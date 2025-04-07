// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateGrammarPointDto } from './create-grammar-point.dto';

export class UpdateGrammarPointDto extends PartialType(CreateGrammarPointDto) {}
