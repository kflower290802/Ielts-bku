import { Module } from '@nestjs/common';
import { UserExamAnswersService } from './user-exam-answers.service';
import { UserExamAnswersController } from './user-exam-answers.controller';
import { DocumentUserExamAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentUserExamAnswerPersistenceModule,
  ],
  controllers: [UserExamAnswersController],
  providers: [UserExamAnswersService],
  exports: [UserExamAnswersService, DocumentUserExamAnswerPersistenceModule],
})
export class UserExamAnswersModule {}
