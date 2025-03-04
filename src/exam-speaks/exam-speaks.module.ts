import { forwardRef, Module } from '@nestjs/common';
import { ExamSpeaksService } from './exam-speaks.service';
import { ExamSpeaksController } from './exam-speaks.controller';
import { DocumentExamSpeakPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ExamsModule } from '../exams/exams.module';
import { UserExamSpeakAnswersModule } from '../user-exam-speak-answers/user-exam-speak-answers.module';
import { UserExamsModule } from '../user-exams/user-exams.module';

@Module({
  imports: [
    DocumentExamSpeakPersistenceModule,
    CloudinaryModule,
    forwardRef(() => ExamsModule),
    forwardRef(() => UserExamSpeakAnswersModule),
    UserExamsModule,
  ],
  controllers: [ExamSpeaksController],
  providers: [ExamSpeaksService],
  exports: [ExamSpeaksService, DocumentExamSpeakPersistenceModule],
})
export class ExamSpeaksModule {}
