import { Module } from '@nestjs/common';
import { UserPracticeSessionsService } from './user-practice-sessions.service';
import { DocumentUserPracticeSessionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserPracticesModule } from '../user-practices/user-practices.module';

@Module({
  imports: [DocumentUserPracticeSessionPersistenceModule, UserPracticesModule],
  providers: [UserPracticeSessionsService],
  exports: [
    UserPracticeSessionsService,
    DocumentUserPracticeSessionPersistenceModule,
  ],
})
export class UserPracticeSessionsModule {}
