import { forwardRef, Module } from '@nestjs/common';
import { ExamListenAnswersService } from './exam-listen-answers.service';
import { ExamListenAnswersController } from './exam-listen-answers.controller';
import { DocumentExamListenAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamListenQuestionsModule } from '../exam-listen-questions/exam-listen-questions.module';

@Module({
  imports: [
    DocumentExamListenAnswerPersistenceModule,
    forwardRef(() => ExamListenQuestionsModule),
  ],
  controllers: [ExamListenAnswersController],
  providers: [ExamListenAnswersService],
  exports: [
    ExamListenAnswersService,
    DocumentExamListenAnswerPersistenceModule,
  ],
})
export class ExamListenAnswersModule {}
