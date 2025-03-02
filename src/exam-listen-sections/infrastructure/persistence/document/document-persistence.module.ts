import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamListenSectionSchema,
  ExamListenSectionSchemaClass,
} from './entities/exam-listen-section.schema';
import { ExamListenSectionRepository } from '../exam-listen-section.repository';
import { ExamListenSectionDocumentRepository } from './repositories/exam-listen-section.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExamListenSectionSchemaClass.name,
        schema: ExamListenSectionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ExamListenSectionRepository,
      useClass: ExamListenSectionDocumentRepository,
    },
  ],
  exports: [ExamListenSectionRepository],
})
export class DocumentExamListenSectionPersistenceModule {}
