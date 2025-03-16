import { forwardRef, Module } from '@nestjs/common';
import { ExamPassagesService } from './exam-passages.service';
import { ExamPassagesController } from './exam-passages.controller';
import { DocumentExamPassagePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamsModule } from '../exams/exams.module';
import { ExamPassageQuestionsModule } from '../exam-passage-questions/exam-passage-questions.module';
import { ExamPassageAnswersModule } from '../exam-passage-answers/exam-passage-answers.module';
import { ExamReadingTypesModule } from '../exam-reading-types/exam-reading-types.module';

@Module({
  imports: [
    DocumentExamPassagePersistenceModule,
    forwardRef(() => ExamsModule),
    forwardRef(() => ExamPassageQuestionsModule),
    ExamPassageAnswersModule,
    ExamReadingTypesModule,
  ],
  controllers: [ExamPassagesController],
  providers: [ExamPassagesService],
  exports: [ExamPassagesService, DocumentExamPassagePersistenceModule],
})
export class ExamPassagesModule {}
