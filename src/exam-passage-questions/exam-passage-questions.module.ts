import { forwardRef, Module } from '@nestjs/common';
import { ExamPassageQuestionsService } from './exam-passage-questions.service';
import { ExamPassageQuestionsController } from './exam-passage-questions.controller';
import { DocumentExamPassageQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamPassageAnswersModule } from '../exam-passage-answers/exam-passage-answers.module';
import { ExamReadingTypesModule } from '../exam-reading-types/exam-reading-types.module';

@Module({
  imports: [
    DocumentExamPassageQuestionPersistenceModule,
    ExamPassageAnswersModule,
    forwardRef(() => ExamReadingTypesModule),
  ],
  controllers: [ExamPassageQuestionsController],
  providers: [ExamPassageQuestionsService],
  exports: [
    ExamPassageQuestionsService,
    DocumentExamPassageQuestionPersistenceModule,
  ],
})
export class ExamPassageQuestionsModule {}
