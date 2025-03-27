import { Module } from '@nestjs/common';
import { UserPracticeWritingAnswersService } from './user-practice-writing-answers.service';
import { UserPracticeWritingAnswersController } from './user-practice-writing-answers.controller';
import { DocumentUserPracticeWritingAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentUserPracticeWritingAnswerPersistenceModule],
  controllers: [UserPracticeWritingAnswersController],
  providers: [UserPracticeWritingAnswersService],
  exports: [
    UserPracticeWritingAnswersService,
    DocumentUserPracticeWritingAnswerPersistenceModule,
  ],
})
export class UserPracticeWritingAnswersModule {}
