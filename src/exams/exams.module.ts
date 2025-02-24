import { forwardRef, Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { DocumentExamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ExamPassagesModule } from '../exam-passages/exam-passages.module';
import { UserExamsModule } from '../user-exams/user-exams.module';
import { UserExamSessionsModule } from '../user-exam-sessions/user-exam-sessions.module';
import { UserExamAnswersModule } from '../user-exam-answers/user-exam-answers.module';
import { ExamPassageAnswersModule } from '../exam-passage-answers/exam-passage-answers.module';

@Module({
  imports: [
    DocumentExamPersistenceModule,
    CloudinaryModule,
    forwardRef(() => ExamPassagesModule),
    forwardRef(() => UserExamsModule),
    UserExamSessionsModule,
    UserExamAnswersModule,
    ExamPassageAnswersModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService, DocumentExamPersistenceModule],
})
export class ExamsModule {}
