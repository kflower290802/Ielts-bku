import { Module } from '@nestjs/common';
import { BlogTopicsService } from './blog-topics.service';
import { DocumentBlogTopicPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentBlogTopicPersistenceModule],
  providers: [BlogTopicsService],
  exports: [BlogTopicsService, DocumentBlogTopicPersistenceModule],
})
export class BlogTopicsModule {}
