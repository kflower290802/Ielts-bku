import { Module } from '@nestjs/common';
import { ExamSpeakPartsService } from './exam-speak-parts.service';
import { ExamSpeakPartsController } from './exam-speak-parts.controller';
import { DocumentExamSpeakPartPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { ExamSpeakQuestionsModule } from '../exam-speak-questions/exam-speak-questions.module';
import { UserExamSpeakAnswersModule } from '../user-exam-speak-answers/user-exam-speak-answers.module';
@Module({
  imports: [
    DocumentExamSpeakPartPersistenceModule,
    ExamSpeakQuestionsModule,
    UserExamSpeakAnswersModule,
  ],
  controllers: [ExamSpeakPartsController],
  providers: [ExamSpeakPartsService],
  exports: [ExamSpeakPartsService, DocumentExamSpeakPartPersistenceModule],
})
export class ExamSpeakPartsModule {}
