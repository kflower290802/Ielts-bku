import { Module } from '@nestjs/common';
import { PracticeSpeakingQuestionsService } from './practice-speaking-questions.service';
import { PracticeSpeakingQuestionsController } from './practice-speaking-questions.controller';
import { DocumentPracticeSpeakingQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserPracticeSpeakAnswersModule } from '../user-practice-speak-answers/user-practice-speak-answers.module';
import { UserPracticesModule } from '../user-practices/user-practices.module';
@Module({
  imports: [
    DocumentPracticeSpeakingQuestionPersistenceModule,
    CloudinaryModule,
    UserPracticesModule,
    UserPracticeSpeakAnswersModule,
  ],
  controllers: [PracticeSpeakingQuestionsController],
  providers: [PracticeSpeakingQuestionsService],
  exports: [
    PracticeSpeakingQuestionsService,
    DocumentPracticeSpeakingQuestionPersistenceModule,
  ],
})
export class PracticeSpeakingQuestionsModule {}
