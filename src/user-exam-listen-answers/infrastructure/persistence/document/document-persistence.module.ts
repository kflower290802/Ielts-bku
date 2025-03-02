import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExamListenAnswerSchema,
  UserExamListenAnswerSchemaClass,
} from './entities/user-exam-listen-answer.schema';
import { UserExamListenAnswerRepository } from '../user-exam-listen-answer.repository';
import { UserExamListenAnswerDocumentRepository } from './repositories/user-exam-listen-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserExamListenAnswerSchemaClass.name,
        schema: UserExamListenAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserExamListenAnswerRepository,
      useClass: UserExamListenAnswerDocumentRepository,
    },
  ],
  exports: [UserExamListenAnswerRepository],
})
export class DocumentUserExamListenAnswerPersistenceModule {}
