import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BlogLessonSchema,
  BlogLessonSchemaClass,
} from './entities/blog-lesson.schema';
import { BlogLessonRepository } from '../blog-lesson.repository';
import { BlogLessonDocumentRepository } from './repositories/blog-lesson.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogLessonSchemaClass.name, schema: BlogLessonSchema },
    ]),
  ],
  providers: [
    {
      provide: BlogLessonRepository,
      useClass: BlogLessonDocumentRepository,
    },
  ],
  exports: [BlogLessonRepository],
})
export class DocumentBlogLessonPersistenceModule {}
