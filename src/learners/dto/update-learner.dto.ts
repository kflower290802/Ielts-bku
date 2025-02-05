// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatelearnerDto } from './create-learner.dto';

export class UpdatelearnerDto extends PartialType(CreatelearnerDto) {}
