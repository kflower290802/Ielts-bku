import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPracticeListenAnswerSchema,
  UserPracticeListenAnswerSchemaClass,
} from './entities/user-practice-listen-answer.schema';
import { UserPracticeListenAnswerRepository } from '../user-practice-listen-answer.repository';
import { UserPracticeListenAnswerDocumentRepository } from './repositories/user-practice-listen-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPracticeListenAnswerSchemaClass.name,
        schema: UserPracticeListenAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserPracticeListenAnswerRepository,
      useClass: UserPracticeListenAnswerDocumentRepository,
    },
  ],
  exports: [UserPracticeListenAnswerRepository],
})
export class DocumentUserPracticeListenAnswerPersistenceModule {}
