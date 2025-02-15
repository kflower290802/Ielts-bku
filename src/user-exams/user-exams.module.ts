import { Module } from '@nestjs/common';
import { UserExamsService } from './user-exams.service';
import { UserExamsController } from './user-exams.controller';
import { DocumentUserExamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentUserExamPersistenceModule,
  ],
  controllers: [UserExamsController],
  providers: [UserExamsService],
  exports: [UserExamsService, DocumentUserExamPersistenceModule],
})
export class UserExamsModule {}
