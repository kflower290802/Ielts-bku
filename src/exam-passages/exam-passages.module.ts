import { forwardRef, Module } from '@nestjs/common';
import { ExamPassagesService } from './exam-passages.service';
import { ExamPassagesController } from './exam-passages.controller';
import { DocumentExamPassagePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamsModule } from '../exams/exams.module';
import { ExamReadingTypesModule } from '../exam-reading-types/exam-reading-types.module';

@Module({
  imports: [
    DocumentExamPassagePersistenceModule,
    forwardRef(() => ExamsModule),
    ExamReadingTypesModule,
  ],
  controllers: [ExamPassagesController],
  providers: [ExamPassagesService],
  exports: [ExamPassagesService, DocumentExamPassagePersistenceModule],
})
export class ExamPassagesModule {}
