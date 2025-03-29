import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamSpeakQuestionSchema,
  ExamSpeakQuestionSchemaClass,
} from './entities/exam-speak-question.schema';
import { ExamSpeakQuestionRepository } from '../exam-speak-question.repository';
import { ExamSpeakQuestionDocumentRepository } from './repositories/exam-speak-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExamSpeakQuestionSchemaClass.name,
        schema: ExamSpeakQuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ExamSpeakQuestionRepository,
      useClass: ExamSpeakQuestionDocumentRepository,
    },
  ],
  exports: [ExamSpeakQuestionRepository],
})
export class DocumentExamSpeakQuestionPersistenceModule {}
