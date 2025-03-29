import { Module } from '@nestjs/common';
import { UserExamSpeakAnswersService } from './user-exam-speak-answers.service';
import { DocumentUserExamSpeakAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserExamsModule } from '../user-exams/user-exams.module';

@Module({
  imports: [DocumentUserExamSpeakAnswerPersistenceModule, UserExamsModule],
  providers: [UserExamSpeakAnswersService],
  exports: [
    UserExamSpeakAnswersService,
    DocumentUserExamSpeakAnswerPersistenceModule,
  ],
})
export class UserExamSpeakAnswersModule {}
