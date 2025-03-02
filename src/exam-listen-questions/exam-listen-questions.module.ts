import { forwardRef, Module } from '@nestjs/common';
import { ExamListenQuestionsService } from './exam-listen-questions.service';
import { ExamListenQuestionsController } from './exam-listen-questions.controller';
import { DocumentExamListenQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamListenSectionsModule } from '../exam-listen-sections/exam-listen-sections.module';
import { ExamListenAnswersModule } from '../exam-listen-answers/exam-listen-answers.module';

@Module({
  imports: [
    DocumentExamListenQuestionPersistenceModule,
    forwardRef(() => ExamListenSectionsModule),
    forwardRef(() => ExamListenAnswersModule),
  ],
  controllers: [ExamListenQuestionsController],
  providers: [ExamListenQuestionsService],
  exports: [
    ExamListenQuestionsService,
    DocumentExamListenQuestionPersistenceModule,
  ],
})
export class ExamListenQuestionsModule {}
