import { forwardRef, Module } from '@nestjs/common';
import { ExamListenQuestionsService } from './exam-listen-questions.service';
import { ExamListenQuestionsController } from './exam-listen-questions.controller';
import { DocumentExamListenQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamListenAnswersModule } from '../exam-listen-answers/exam-listen-answers.module';
import { ExamListenTypesModule } from '../exam-listen-types/exam-listen-types.module';

@Module({
  imports: [
    DocumentExamListenQuestionPersistenceModule,
    forwardRef(() => ExamListenAnswersModule),
    forwardRef(() => ExamListenTypesModule),
  ],
  controllers: [ExamListenQuestionsController],
  providers: [ExamListenQuestionsService],
  exports: [
    ExamListenQuestionsService,
    DocumentExamListenQuestionPersistenceModule,
  ],
})
export class ExamListenQuestionsModule {}
