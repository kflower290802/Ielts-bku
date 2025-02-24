import { Module } from '@nestjs/common';
import { UserExamAnswersService } from './user-exam-answers.service';
import { UserExamAnswersController } from './user-exam-answers.controller';
import { DocumentUserExamAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserExamsModule } from '../user-exams/user-exams.module';
import { ExamPassageQuestionsModule } from '../exam-passage-questions/exam-passage-questions.module';

@Module({
  imports: [
    DocumentUserExamAnswerPersistenceModule,
    UserExamsModule,
    ExamPassageQuestionsModule,
  ],
  controllers: [UserExamAnswersController],
  providers: [UserExamAnswersService],
  exports: [UserExamAnswersService, DocumentUserExamAnswerPersistenceModule],
})
export class UserExamAnswersModule {}
