import { Module } from '@nestjs/common';
import { ExamPassagesService } from './exam-passages.service';
import { ExamPassagesController } from './exam-passages.controller';
import { DocumentExamPassagePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [DocumentExamPassagePersistenceModule, ExamsModule],
  controllers: [ExamPassagesController],
  providers: [ExamPassagesService],
  exports: [ExamPassagesService, DocumentExamPassagePersistenceModule],
})
export class ExamPassagesModule {}
