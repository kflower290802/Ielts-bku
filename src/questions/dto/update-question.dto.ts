// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatequestionDto } from './create-question.dto';

export class UpdatequestionDto extends PartialType(CreatequestionDto) {}
