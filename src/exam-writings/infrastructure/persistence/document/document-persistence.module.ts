import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamWritingSchema,
  ExamWritingSchemaClass,
} from './entities/exam-writing.schema';
import { ExamWritingRepository } from '../exam-writing.repository';
import { ExamWritingDocumentRepository } from './repositories/exam-writing.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamWritingSchemaClass.name, schema: ExamWritingSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamWritingRepository,
      useClass: ExamWritingDocumentRepository,
    },
  ],
  exports: [ExamWritingRepository],
})
export class DocumentExamWritingPersistenceModule {}
