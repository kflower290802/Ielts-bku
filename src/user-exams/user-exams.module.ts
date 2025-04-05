import { forwardRef, Module } from '@nestjs/common';
import { UserExamsService } from './user-exams.service';
import { UserExamsController } from './user-exams.controller';
import { DocumentUserExamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UsersModule } from '../users/users.module';
import { ExamsModule } from '../exams/exams.module';
import { UserExamSessionsModule } from '../user-exam-sessions/user-exam-sessions.module';

@Module({
  imports: [
    DocumentUserExamPersistenceModule,
    UsersModule,
    forwardRef(() => ExamsModule),
    forwardRef(() => UserExamSessionsModule),
  ],
  controllers: [UserExamsController],
  providers: [UserExamsService],
  exports: [UserExamsService, DocumentUserExamPersistenceModule],
})
export class UserExamsModule {}
