import { Module } from '@nestjs/common';
import { PracticeWritingsService } from './practice-writings.service';
import { PracticeWritingsController } from './practice-writings.controller';
import { DocumentPracticeWritingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserPracticeWritingAnswersModule } from '../user-practice-writing-answers/user-practice-writing-answers.module';
import { UserPracticesModule } from '../user-practices/user-practices.module';

@Module({
  imports: [
    DocumentPracticeWritingPersistenceModule,
    CloudinaryModule,
    UserPracticeWritingAnswersModule,
    UserPracticesModule,
  ],
  controllers: [PracticeWritingsController],
  providers: [PracticeWritingsService],
  exports: [PracticeWritingsService, DocumentPracticeWritingPersistenceModule],
})
export class PracticeWritingsModule {}
