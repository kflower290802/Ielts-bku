import { Module } from '@nestjs/common';
import { PracticeListenAnswersService } from './practice-listen-answers.service';
import { PracticeListenAnswersController } from './practice-listen-answers.controller';
import { DocumentPracticeListenAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPracticeListenAnswerPersistenceModule],
  controllers: [PracticeListenAnswersController],
  providers: [PracticeListenAnswersService],
  exports: [
    PracticeListenAnswersService,
    DocumentPracticeListenAnswerPersistenceModule,
  ],
})
export class PracticeListenAnswersModule {}
