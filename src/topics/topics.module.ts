import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { DocumentTopicPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentTopicPersistenceModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService, DocumentTopicPersistenceModule],
})
export class TopicsModule {}
