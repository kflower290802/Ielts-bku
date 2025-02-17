import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExamAnswerSchema,
  UserExamAnswerSchemaClass,
} from './entities/user-exam-answer.schema';
import { UserExamAnswerRepository } from '../user-exam-answer.repository';
import { UserExamAnswerDocumentRepository } from './repositories/user-exam-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserExamAnswerSchemaClass.name, schema: UserExamAnswerSchema },
    ]),
  ],
  providers: [
    {
      provide: UserExamAnswerRepository,
      useClass: UserExamAnswerDocumentRepository,
    },
  ],
  exports: [UserExamAnswerRepository],
})
export class DocumentUserExamAnswerPersistenceModule {}
