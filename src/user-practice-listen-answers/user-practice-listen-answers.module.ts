import { Module } from '@nestjs/common';
import { UserPracticeListenAnswersService } from './user-practice-listen-answers.service';
import { UserPracticeListenAnswersController } from './user-practice-listen-answers.controller';
import { DocumentUserPracticeListenAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentUserPracticeListenAnswerPersistenceModule],
  controllers: [UserPracticeListenAnswersController],
  providers: [UserPracticeListenAnswersService],
  exports: [
    UserPracticeListenAnswersService,
    DocumentUserPracticeListenAnswerPersistenceModule,
  ],
})
export class UserPracticeListenAnswersModule {}
