import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamListenQuestionSchema,
  ExamListenQuestionSchemaClass,
} from './entities/exam-listen-question.schema';
import { ExamListenQuestionRepository } from '../exam-listen-question.repository';
import { ExamListenQuestionDocumentRepository } from './repositories/exam-listen-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExamListenQuestionSchemaClass.name,
        schema: ExamListenQuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ExamListenQuestionRepository,
      useClass: ExamListenQuestionDocumentRepository,
    },
  ],
  exports: [ExamListenQuestionRepository],
})
export class DocumentExamListenQuestionPersistenceModule {}
