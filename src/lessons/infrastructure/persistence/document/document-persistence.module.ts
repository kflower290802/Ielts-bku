import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { lessonSchema, lessonSchemaClass } from './entities/lesson.schema';
import { lessonRepository } from '../lesson.repository';
import { lessonDocumentRepository } from './repositories/lesson.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: lessonSchemaClass.name, schema: lessonSchema },
    ]),
  ],
  providers: [
    {
      provide: lessonRepository,
      useClass: lessonDocumentRepository,
    },
  ],
  exports: [lessonRepository],
})
export class DocumentlessonPersistenceModule {}
