import { Module } from '@nestjs/common';
import { UserPracticeSessionsService } from './user-practice-sessions.service';
import { DocumentUserPracticeSessionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentUserPracticeSessionPersistenceModule],
  providers: [UserPracticeSessionsService],
  exports: [
    UserPracticeSessionsService,
    DocumentUserPracticeSessionPersistenceModule,
  ],
})
export class UserPracticeSessionsModule {}
