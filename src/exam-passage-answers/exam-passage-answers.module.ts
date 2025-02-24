import { Module } from '@nestjs/common';
import { ExamPassageAnswersService } from './exam-passage-answers.service';
import { ExamPassageAnswersController } from './exam-passage-answers.controller';
import { DocumentExamPassageAnswerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentExamPassageAnswerPersistenceModule],
  controllers: [ExamPassageAnswersController],
  providers: [ExamPassageAnswersService],
  exports: [
    ExamPassageAnswersService,
    DocumentExamPassageAnswerPersistenceModule,
  ],
})
export class ExamPassageAnswersModule {}
