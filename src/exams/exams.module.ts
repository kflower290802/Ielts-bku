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
import { ExamListenSectionsModule } from '../exam-listen-sections/exam-listen-sections.module';
import { UserExamListenAnswersModule } from '../user-exam-listen-answers/user-exam-listen-answers.module';
import { ExamSpeaksModule } from '../exam-speaks/exam-speaks.module';
import { UserExamSpeakAnswersModule } from '../user-exam-speak-answers/user-exam-speak-answers.module';
import { ExamWritingsModule } from '../exam-writings/exam-writings.module';
import { UserExamWritingsModule } from '../user-exam-writings/user-exam-writings.module';
import { ExamListenAnswersModule } from '../exam-listen-answers/exam-listen-answers.module';
import { UserPracticeSessionsModule } from '../user-practice-sessions/user-practice-sessions.module';

@Module({
  imports: [
    DocumentExamPersistenceModule,
    CloudinaryModule,
    forwardRef(() => ExamPassagesModule),
    forwardRef(() => UserExamsModule),
    UserExamSessionsModule,
    UserExamAnswersModule,
    ExamPassageAnswersModule,
    forwardRef(() => ExamListenSectionsModule),
    UserExamListenAnswersModule,
    ExamSpeaksModule,
    UserExamSpeakAnswersModule,
    ExamWritingsModule,
    UserExamWritingsModule,
    ExamListenAnswersModule,
    UserPracticeSessionsModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService, DocumentExamPersistenceModule],
})
export class ExamsModule {}
