import { Module } from '@nestjs/common';
import { PracticeReadingAnswersService } from './practice-reading-answers.service';
import { DocumentPracticeReadingAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPracticeReadingAnswerPersistenceModule],
  providers: [PracticeReadingAnswersService],
  exports: [
    PracticeReadingAnswersService,
    DocumentPracticeReadingAnswerPersistenceModule,
  ],
})
export class PracticeReadingAnswersModule {}
