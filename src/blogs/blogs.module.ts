import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { DocumentBlogPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentBlogPersistenceModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService, DocumentBlogPersistenceModule],
})
export class BlogsModule {}
