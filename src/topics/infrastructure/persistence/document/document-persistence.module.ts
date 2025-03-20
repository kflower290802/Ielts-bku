import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicSchema, TopicSchemaClass } from './entities/topic.schema';
import { TopicRepository } from '../topic.repository';
import { TopicDocumentRepository } from './repositories/topic.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TopicSchemaClass.name, schema: TopicSchema },
    ]),
  ],
  providers: [
    {
      provide: TopicRepository,
      useClass: TopicDocumentRepository,
    },
  ],
  exports: [TopicRepository],
})
export class DocumentTopicPersistenceModule {}
