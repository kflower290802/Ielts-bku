import { forwardRef, Module } from '@nestjs/common';
import { ExamListenTypesService } from './exam-listen-types.service';
import { ExamListenTypesController } from './exam-listen-types.controller';
import { DocumentExamListenTypePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamListenSectionsModule } from '../exam-listen-sections/exam-listen-sections.module';
import { ExamListenQuestionsModule } from '../exam-listen-questions/exam-listen-questions.module';
import { ExamListenAnswersModule } from '../exam-listen-answers/exam-listen-answers.module';

@Module({
  imports: [
    DocumentExamListenTypePersistenceModule,
    forwardRef(() => ExamListenSectionsModule),
    forwardRef(() => ExamListenQuestionsModule),
    forwardRef(() => ExamListenAnswersModule),
  ],
  controllers: [ExamListenTypesController],
  providers: [ExamListenTypesService],
  exports: [ExamListenTypesService, DocumentExamListenTypePersistenceModule],
})
export class ExamListenTypesModule {}
