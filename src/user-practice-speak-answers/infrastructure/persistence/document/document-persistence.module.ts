import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPracticeSpeakAnswerSchema,
  UserPracticeSpeakAnswerSchemaClass,
} from './entities/user-practice-speak-answer.schema';
import { UserPracticeSpeakAnswerRepository } from '../user-practice-speak-answer.repository';
import { UserPracticeSpeakAnswerDocumentRepository } from './repositories/user-practice-speak-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPracticeSpeakAnswerSchemaClass.name,
        schema: UserPracticeSpeakAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserPracticeSpeakAnswerRepository,
      useClass: UserPracticeSpeakAnswerDocumentRepository,
    },
  ],
  exports: [UserPracticeSpeakAnswerRepository],
})
export class DocumentUserPracticeSpeakAnswerPersistenceModule {}
