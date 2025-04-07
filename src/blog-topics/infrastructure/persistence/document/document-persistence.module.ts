import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BlogTopicSchema,
  BlogTopicSchemaClass,
} from './entities/blog-topic.schema';
import { BlogTopicRepository } from '../blog-topic.repository';
import { BlogTopicDocumentRepository } from './repositories/blog-topic.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogTopicSchemaClass.name, schema: BlogTopicSchema },
    ]),
  ],
  providers: [
    {
      provide: BlogTopicRepository,
      useClass: BlogTopicDocumentRepository,
    },
  ],
  exports: [BlogTopicRepository],
})
export class DocumentBlogTopicPersistenceModule {}
