import { forwardRef, Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { DocumentLessonPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { BlogsModule } from '../blogs/blogs.module';
import { VideosModule } from '../videos/videos.module';
import { BlogLessonsModule } from '../blog-lessons/blog-lessons.module';
import { FlashCardsModule } from '../flash-cards/flash-cards.module';

@Module({
  imports: [
    DocumentLessonPersistenceModule,
    BlogsModule,
    VideosModule,
    forwardRef(() => BlogLessonsModule),
    forwardRef(() => FlashCardsModule),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService, DocumentLessonPersistenceModule],
})
export class LessonModule {}
