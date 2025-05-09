import { Module } from '@nestjs/common';
import { PracticeListenAnswersService } from './practice-listen-answers.service';
import { DocumentPracticeListenAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPracticeListenAnswerPersistenceModule],
  providers: [PracticeListenAnswersService],
  exports: [
    PracticeListenAnswersService,
    DocumentPracticeListenAnswerPersistenceModule,
  ],
})
export class PracticeListenAnswersModule {}
