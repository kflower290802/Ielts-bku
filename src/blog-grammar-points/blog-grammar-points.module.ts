import { Module } from '@nestjs/common';
import { BlogGrammarPointsService } from './blog-grammar-points.service';
import { DocumentBlogGrammarPointPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentBlogGrammarPointPersistenceModule],
  providers: [BlogGrammarPointsService],
  exports: [
    BlogGrammarPointsService,
    DocumentBlogGrammarPointPersistenceModule,
  ],
})
export class BlogGrammarPointsModule {}
