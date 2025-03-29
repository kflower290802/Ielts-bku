import { Module } from '@nestjs/common';
import { ExamSpeakPartsService } from './exam-speak-parts.service';
import { ExamSpeakPartsController } from './exam-speak-parts.controller';
import { DocumentExamSpeakPartPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentExamSpeakPartPersistenceModule],
  controllers: [ExamSpeakPartsController],
  providers: [ExamSpeakPartsService],
  exports: [ExamSpeakPartsService, DocumentExamSpeakPartPersistenceModule],
})
export class ExamSpeakPartsModule {}
