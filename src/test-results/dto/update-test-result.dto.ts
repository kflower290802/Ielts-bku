// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { Createtest_resultDto } from './create-test-result.dto';

export class Updatetest_resultDto extends PartialType(Createtest_resultDto) {}
