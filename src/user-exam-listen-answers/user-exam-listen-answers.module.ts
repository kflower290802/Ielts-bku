import { Module } from '@nestjs/common';
import { UserExamListenAnswersService } from './user-exam-listen-answers.service';
import { UserExamListenAnswersController } from './user-exam-listen-answers.controller';
import { DocumentUserExamListenAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamListenSectionsModule } from '../exam-listen-sections/exam-listen-sections.module';
import { UserExamsModule } from '../user-exams/user-exams.module';

@Module({
  imports: [
    DocumentUserExamListenAnswerPersistenceModule,
    ExamListenSectionsModule,
    UserExamsModule,
  ],
  controllers: [UserExamListenAnswersController],
  providers: [UserExamListenAnswersService],
  exports: [
    UserExamListenAnswersService,
    DocumentUserExamListenAnswerPersistenceModule,
  ],
})
export class UserExamListenAnswersModule {}
