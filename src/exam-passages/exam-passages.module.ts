import { forwardRef, Module } from '@nestjs/common';
import { ExamPassagesService } from './exam-passages.service';
import { ExamPassagesController } from './exam-passages.controller';
import { DocumentExamPassagePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamsModule } from '../exams/exams.module';
import { ExamPassageQuestionsModule } from '../exam-passage-questions/exam-passage-questions.module';

@Module({
  imports: [
    DocumentExamPassagePersistenceModule,
    forwardRef(() => ExamsModule),
    forwardRef(() => ExamPassageQuestionsModule),
  ],
  controllers: [ExamPassagesController],
  providers: [ExamPassagesService],
  exports: [ExamPassagesService, DocumentExamPassagePersistenceModule],
})
export class ExamPassagesModule {}
