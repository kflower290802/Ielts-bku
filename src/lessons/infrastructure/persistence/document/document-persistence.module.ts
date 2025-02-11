import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { lessonSchema, LessonSchemaClass } from './entities/lesson.schema';
import { LessonRepository } from '../lesson.repository';
import { lessonDocumentRepository } from './repositories/lesson.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonSchemaClass.name, schema: lessonSchema },
    ]),
  ],
  providers: [
    {
      provide: LessonRepository,
      useClass: lessonDocumentRepository,
    },
  ],
  exports: [LessonRepository],
})
export class DocumentLessonPersistenceModule {}
