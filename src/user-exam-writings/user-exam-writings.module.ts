import { Module } from '@nestjs/common';
import { UserExamWritingsService } from './user-exam-writings.service';
import { UserExamWritingsController } from './user-exam-writings.controller';
import { DocumentUserExamWritingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserExamsModule } from '../user-exams/user-exams.module';

@Module({
  imports: [DocumentUserExamWritingPersistenceModule, UserExamsModule],
  controllers: [UserExamWritingsController],
  providers: [UserExamWritingsService],
  exports: [UserExamWritingsService, DocumentUserExamWritingPersistenceModule],
})
export class UserExamWritingsModule {}
