import { forwardRef, Module } from '@nestjs/common';
import { PracticeReadingsService } from './practice-readings.service';
import { PracticeReadingsController } from './practice-readings.controller';
import { DocumentPracticeReadingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PracticesModule } from '../practices/practices.module';
import { PracticeReadingTypesModule } from '../practice-reading-types/practice-reading-types.module';
import { UserPracticeReadingAnswersModule } from '../user-practice-reading-answers/user-practice-reading-answers.module';
import { UserPracticesModule } from '../user-practices/user-practices.module';

@Module({
  imports: [
    DocumentPracticeReadingPersistenceModule,
    CloudinaryModule,
    forwardRef(() => PracticesModule),
    forwardRef(() => PracticeReadingTypesModule),
    UserPracticeReadingAnswersModule,
    UserPracticesModule,
  ],
  controllers: [PracticeReadingsController],
  providers: [PracticeReadingsService],
  exports: [PracticeReadingsService, DocumentPracticeReadingPersistenceModule],
})
export class PracticeReadingsModule {}
