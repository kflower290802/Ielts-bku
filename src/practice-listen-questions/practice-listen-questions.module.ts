import { Module } from '@nestjs/common';
import { PracticeListenQuestionsService } from './practice-listen-questions.service';
import { PracticeListenQuestionsController } from './practice-listen-questions.controller';
import { DocumentPracticeListenQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { PracticeListenAnswersModule } from '../practice-listen-answers/practice-listen-answers.module';

@Module({
  imports: [
    DocumentPracticeListenQuestionPersistenceModule,
    PracticeListenAnswersModule,
  ],
  controllers: [PracticeListenQuestionsController],
  providers: [PracticeListenQuestionsService],
  exports: [
    PracticeListenQuestionsService,
    DocumentPracticeListenQuestionPersistenceModule,
  ],
})
export class PracticeListenQuestionsModule {}
