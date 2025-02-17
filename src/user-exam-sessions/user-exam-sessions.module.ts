import { Module } from '@nestjs/common';
import { UserExamSessionsService } from './user-exam-sessions.service';
import { UserExamSessionsController } from './user-exam-sessions.controller';
import { DocumentUserExamSessionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserExamsModule } from '../user-exams/user-exams.module';

@Module({
  imports: [DocumentUserExamSessionPersistenceModule, UserExamsModule],
  controllers: [UserExamSessionsController],
  providers: [UserExamSessionsService],
  exports: [UserExamSessionsService, DocumentUserExamSessionPersistenceModule],
})
export class UserExamSessionsModule {}
