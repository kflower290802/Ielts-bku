import { Module } from '@nestjs/common';
import { UserExamsService } from './user-exams.service';
import { UserExamsController } from './user-exams.controller';
import { DocumentUserExamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UsersModule } from '../users/users.module';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [DocumentUserExamPersistenceModule, UsersModule, ExamsModule],
  controllers: [UserExamsController],
  providers: [UserExamsService],
  exports: [UserExamsService, DocumentUserExamPersistenceModule],
})
export class UserExamsModule {}
