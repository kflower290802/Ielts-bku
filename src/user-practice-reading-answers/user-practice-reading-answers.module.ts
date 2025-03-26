import { Module } from '@nestjs/common';
import { UserPracticeReadingAnswersService } from './user-practice-reading-answers.service';
import { DocumentUserPracticeReadingAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentUserPracticeReadingAnswerPersistenceModule],
  providers: [UserPracticeReadingAnswersService],
  exports: [
    UserPracticeReadingAnswersService,
    DocumentUserPracticeReadingAnswerPersistenceModule,
  ],
})
export class UserPracticeReadingAnswersModule {}
