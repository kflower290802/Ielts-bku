import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPracticeReadingAnswerSchema,
  UserPracticeReadingAnswerSchemaClass,
} from './entities/user-practice-reading-answer.schema';
import { UserPracticeReadingAnswerRepository } from '../user-practice-reading-answer.repository';
import { UserPracticeReadingAnswerDocumentRepository } from './repositories/user-practice-reading-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPracticeReadingAnswerSchemaClass.name,
        schema: UserPracticeReadingAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserPracticeReadingAnswerRepository,
      useClass: UserPracticeReadingAnswerDocumentRepository,
    },
  ],
  exports: [UserPracticeReadingAnswerRepository],
})
export class DocumentUserPracticeReadingAnswerPersistenceModule {}
