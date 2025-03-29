import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPracticeSessionSchema,
  UserPracticeSessionSchemaClass,
} from './entities/user-practice-session.schema';
import { UserPracticeSessionRepository } from '../user-practice-session.repository';
import { UserPracticeSessionDocumentRepository } from './repositories/user-practice-session.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPracticeSessionSchemaClass.name,
        schema: UserPracticeSessionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UserPracticeSessionRepository,
      useClass: UserPracticeSessionDocumentRepository,
    },
  ],
  exports: [UserPracticeSessionRepository],
})
export class DocumentUserPracticeSessionPersistenceModule {}
