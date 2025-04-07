import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { DocumentBlogPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { BlogTopicsModule } from '../blog-topics/blog-topics.module';
import { BlogGrammarPointsModule } from '../blog-grammar-points/blog-grammar-points.module';

@Module({
  imports: [
    DocumentBlogPersistenceModule,
    CloudinaryModule,
    BlogTopicsModule,
    BlogGrammarPointsModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService, DocumentBlogPersistenceModule],
})
export class BlogsModule {}
