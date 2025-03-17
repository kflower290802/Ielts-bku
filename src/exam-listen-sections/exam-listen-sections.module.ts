import { forwardRef, Module } from '@nestjs/common';
import { ExamListenSectionsService } from './exam-listen-sections.service';
import { ExamListenSectionsController } from './exam-listen-sections.controller';
import { DocumentExamListenSectionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamsModule } from '../exams/exams.module';
import { ExamListenTypesModule } from '../exam-listen-types/exam-listen-types.module';

@Module({
  imports: [
    DocumentExamListenSectionPersistenceModule,
    forwardRef(() => ExamsModule),
    ExamListenTypesModule,
  ],
  controllers: [ExamListenSectionsController],
  providers: [ExamListenSectionsService],
  exports: [
    ExamListenSectionsService,
    DocumentExamListenSectionPersistenceModule,
  ],
})
export class ExamListenSectionsModule {}
