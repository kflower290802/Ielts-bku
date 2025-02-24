import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamPassageAnswerSchema,
  ExamPassageAnswerSchemaClass,
} from './entities/exam-passage-answer.schema';
import { ExamPassageAnswerRepository } from '../exam-passage-answer.repository';
import { ExamPassageAnswerDocumentRepository } from './repositories/exam-passage-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExamPassageAnswerSchemaClass.name,
        schema: ExamPassageAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ExamPassageAnswerRepository,
      useClass: ExamPassageAnswerDocumentRepository,
    },
  ],
  exports: [ExamPassageAnswerRepository],
})
export class DocumentExamPassageAnswerPersistenceModule {}
