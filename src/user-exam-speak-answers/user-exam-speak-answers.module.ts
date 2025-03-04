import { forwardRef, Module } from '@nestjs/common';
import { UserExamSpeakAnswersService } from './user-exam-speak-answers.service';
import { UserExamSpeakAnswersController } from './user-exam-speak-answers.controller';
import { DocumentUserExamSpeakAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { UserExamsModule } from '../user-exams/user-exams.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ExamSpeaksModule } from '../exam-speaks/exam-speaks.module';

@Module({
  imports: [
    DocumentUserExamSpeakAnswerPersistenceModule,
    UserExamsModule,
    CloudinaryModule,
    forwardRef(() => ExamSpeaksModule),
  ],
  controllers: [UserExamSpeakAnswersController],
  providers: [UserExamSpeakAnswersService],
  exports: [
    UserExamSpeakAnswersService,
    DocumentUserExamSpeakAnswerPersistenceModule,
  ],
})
export class UserExamSpeakAnswersModule {}
