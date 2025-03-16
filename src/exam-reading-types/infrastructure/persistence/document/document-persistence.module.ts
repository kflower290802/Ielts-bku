import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamReadingTypeSchema,
  ExamReadingTypeSchemaClass,
} from './entities/exam-reading-type.schema';
import { ExamReadingTypeRepository } from '../exam-reading-type.repository';
import { ExamReadingTypeDocumentRepository } from './repositories/exam-reading-type.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamReadingTypeSchemaClass.name, schema: ExamReadingTypeSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamReadingTypeRepository,
      useClass: ExamReadingTypeDocumentRepository,
    },
  ],
  exports: [ExamReadingTypeRepository],
})
export class DocumentExamReadingTypePersistenceModule {}
