import { Module } from '@nestjs/common';
import { PracticeReadingsService } from './practice-readings.service';
import { PracticeReadingsController } from './practice-readings.controller';
import { DocumentPracticeReadingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PracticesModule } from '../practices/practices.module';

@Module({
  imports: [
    DocumentPracticeReadingPersistenceModule,
    CloudinaryModule,
    PracticesModule,
  ],
  controllers: [PracticeReadingsController],
  providers: [PracticeReadingsService],
  exports: [PracticeReadingsService, DocumentPracticeReadingPersistenceModule],
})
export class PracticeReadingsModule {}
