import { forwardRef, Module } from '@nestjs/common';
import { ExamListenSectionsService } from './exam-listen-sections.service';
import { ExamListenSectionsController } from './exam-listen-sections.controller';
import { DocumentExamListenSectionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamsModule } from '../exams/exams.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ExamListenQuestionsModule } from '../exam-listen-questions/exam-listen-questions.module';

@Module({
  imports: [
    DocumentExamListenSectionPersistenceModule,
    forwardRef(() => ExamsModule),
    CloudinaryModule,
    forwardRef(() => ExamListenQuestionsModule),
  ],
  controllers: [ExamListenSectionsController],
  providers: [ExamListenSectionsService],
  exports: [
    ExamListenSectionsService,
    DocumentExamListenSectionPersistenceModule,
  ],
})
export class ExamListenSectionsModule {}
