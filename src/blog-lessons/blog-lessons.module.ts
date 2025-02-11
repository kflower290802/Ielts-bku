import { forwardRef, Module } from '@nestjs/common';
import { BlogLessonsService } from './blog-lessons.service';
import { BlogLessonsController } from './blog-lessons.controller';
import { DocumentBlogLessonPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { BlogsModule } from '../blogs/blogs.module';
import { LessonModule } from '../lessons/lessons.module';

@Module({
  imports: [
    DocumentBlogLessonPersistenceModule,
    BlogsModule,
    forwardRef(() => LessonModule),
  ],
  controllers: [BlogLessonsController],
  providers: [BlogLessonsService],
  exports: [BlogLessonsService, DocumentBlogLessonPersistenceModule],
})
export class BlogLessonsModule {}
