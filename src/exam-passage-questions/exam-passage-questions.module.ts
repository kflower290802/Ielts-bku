import { forwardRef, Module } from '@nestjs/common';
import { ExamPassageQuestionsService } from './exam-passage-questions.service';
import { ExamPassageQuestionsController } from './exam-passage-questions.controller';
import { DocumentExamPassageQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamPassagesModule } from '../exam-passages/exam-passages.module';

@Module({
  imports: [
    DocumentExamPassageQuestionPersistenceModule,
    forwardRef(() => ExamPassagesModule),
  ],
  controllers: [ExamPassageQuestionsController],
  providers: [ExamPassageQuestionsService],
  exports: [
    ExamPassageQuestionsService,
    DocumentExamPassageQuestionPersistenceModule,
  ],
})
export class ExamPassageQuestionsModule {}
