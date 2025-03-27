import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPracticeWritingAnswerSchema,
  UserPracticeWritingAnswerSchemaClass,
} from './entities/user-practice-writing-answer.schema';
import { UserPracticeWritingAnswerRepository } from '../user-practice-writing-answer.repository';
import { UserPracticeWritingAnswerDocumentRepository } from './repositories/user-practice-writing-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPracticeWritingAnswerSchemaClass.name,
        schema: UserPracticeWritingAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserPracticeWritingAnswerRepository,
      useClass: UserPracticeWritingAnswerDocumentRepository,
    },
  ],
  exports: [UserPracticeWritingAnswerRepository],
})
export class DocumentUserPracticeWritingAnswerPersistenceModule {}
