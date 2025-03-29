import { forwardRef, Module } from '@nestjs/common';
import { ExamSpeaksService } from './exam-speaks.service';
import { ExamSpeaksController } from './exam-speaks.controller';
import { DocumentExamSpeakPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ExamsModule } from '../exams/exams.module';
import { ExamSpeakPartsModule } from '../exam-speak-parts/exam-speak-parts.module';
import { ExamSpeakQuestionsModule } from '../exam-speak-questions/exam-speak-questions.module';
import { UserExamSpeakAnswersModule } from '../user-exam-speak-answers/user-exam-speak-answers.module';
@Module({
  imports: [
    DocumentExamSpeakPersistenceModule,
    CloudinaryModule,
    forwardRef(() => ExamsModule),
    ExamSpeakPartsModule,
    ExamSpeakQuestionsModule,
    UserExamSpeakAnswersModule,
  ],
  controllers: [ExamSpeaksController],
  providers: [ExamSpeaksService],
  exports: [ExamSpeaksService, DocumentExamSpeakPersistenceModule],
})
export class ExamSpeaksModule {}
