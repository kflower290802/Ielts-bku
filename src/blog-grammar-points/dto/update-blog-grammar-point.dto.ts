// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateBlogGrammarPointDto } from './create-blog-grammar-point.dto';

export class UpdateBlogGrammarPointDto extends PartialType(
  CreateBlogGrammarPointDto,
) {}
