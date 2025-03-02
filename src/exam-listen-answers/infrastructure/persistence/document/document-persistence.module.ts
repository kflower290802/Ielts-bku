import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamListenAnswerSchema,
  ExamListenAnswerSchemaClass,
} from './entities/exam-listen-answer.schema';
import { ExamListenAnswerRepository } from '../exam-listen-answer.repository';
import { ExamListenAnswerDocumentRepository } from './repositories/exam-listen-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExamListenAnswerSchemaClass.name,
        schema: ExamListenAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ExamListenAnswerRepository,
      useClass: ExamListenAnswerDocumentRepository,
    },
  ],
  exports: [ExamListenAnswerRepository],
})
export class DocumentExamListenAnswerPersistenceModule {}
