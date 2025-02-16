import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamPassageQuestionSchema,
  ExamPassageQuestionSchemaClass,
} from './entities/exam-passage-question.schema';
import { ExamPassageQuestionRepository } from '../exam-passage-question.repository';
import { ExamPassageQuestionDocumentRepository } from './repositories/exam-passage-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExamPassageQuestionSchemaClass.name,
        schema: ExamPassageQuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ExamPassageQuestionRepository,
      useClass: ExamPassageQuestionDocumentRepository,
    },
  ],
  exports: [ExamPassageQuestionRepository],
})
export class DocumentExamPassageQuestionPersistenceModule {}
