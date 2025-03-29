import { Module } from '@nestjs/common';
import { ExamSpeakQuestionsService } from './exam-speak-questions.service';
import { ExamSpeakQuestionsController } from './exam-speak-questions.controller';
import { DocumentExamSpeakQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [DocumentExamSpeakQuestionPersistenceModule, CloudinaryModule],
  controllers: [ExamSpeakQuestionsController],
  providers: [ExamSpeakQuestionsService],
  exports: [
    ExamSpeakQuestionsService,
    DocumentExamSpeakQuestionPersistenceModule,
  ],
})
export class ExamSpeakQuestionsModule {}
