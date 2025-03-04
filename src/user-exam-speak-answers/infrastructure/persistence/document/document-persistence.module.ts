import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExamSpeakAnswerSchema,
  UserExamSpeakAnswerSchemaClass,
} from './entities/user-exam-speak-answer.schema';
import { UserExamSpeakAnswerRepository } from '../user-exam-speak-answer.repository';
import { UserExamSpeakAnswerDocumentRepository } from './repositories/user-exam-speak-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserExamSpeakAnswerSchemaClass.name,
        schema: UserExamSpeakAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserExamSpeakAnswerRepository,
      useClass: UserExamSpeakAnswerDocumentRepository,
    },
  ],
  exports: [UserExamSpeakAnswerRepository],
})
export class DocumentUserExamSpeakAnswerPersistenceModule {}
