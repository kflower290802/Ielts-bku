import { forwardRef, Module } from '@nestjs/common';
import { PracticeReadingQuestionsService } from './practice-reading-questions.service';
import { PracticeReadingQuestionsController } from './practice-reading-questions.controller';
import { DocumentPracticeReadingQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { PracticeReadingTypesModule } from '../practice-reading-types/practice-reading-types.module';
import { PracticeReadingAnswersModule } from '../practice-reading-answers/practice-reading-answers.module';

@Module({
  imports: [
    DocumentPracticeReadingQuestionPersistenceModule,
    forwardRef(() => PracticeReadingTypesModule),
    PracticeReadingAnswersModule,
  ],
  controllers: [PracticeReadingQuestionsController],
  providers: [PracticeReadingQuestionsService],
  exports: [
    PracticeReadingQuestionsService,
    DocumentPracticeReadingQuestionPersistenceModule,
  ],
})
export class PracticeReadingQuestionsModule {}
