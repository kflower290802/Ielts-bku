import { Module } from '@nestjs/common';
import { UserPracticeSpeakAnswersService } from './user-practice-speak-answers.service';
import { DocumentUserPracticeSpeakAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentUserPracticeSpeakAnswerPersistenceModule],
  providers: [UserPracticeSpeakAnswersService],
  exports: [
    UserPracticeSpeakAnswersService,
    DocumentUserPracticeSpeakAnswerPersistenceModule,
  ],
})
export class UserPracticeSpeakAnswersModule {}
