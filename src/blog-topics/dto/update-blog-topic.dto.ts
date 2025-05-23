// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateBlogTopicDto } from './create-blog-topic.dto';

export class UpdateBlogTopicDto extends PartialType(CreateBlogTopicDto) {}
