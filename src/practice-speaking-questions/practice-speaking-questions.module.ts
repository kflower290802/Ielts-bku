import { Module } from '@nestjs/common';
import { PracticeSpeakingQuestionsService } from './practice-speaking-questions.service';
import { PracticeSpeakingQuestionsController } from './practice-speaking-questions.controller';
import { DocumentPracticeSpeakingQuestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    DocumentPracticeSpeakingQuestionPersistenceModule,
    CloudinaryModule,
  ],
  controllers: [PracticeSpeakingQuestionsController],
  providers: [PracticeSpeakingQuestionsService],
  exports: [
    PracticeSpeakingQuestionsService,
    DocumentPracticeSpeakingQuestionPersistenceModule,
  ],
})
export class PracticeSpeakingQuestionsModule {}
