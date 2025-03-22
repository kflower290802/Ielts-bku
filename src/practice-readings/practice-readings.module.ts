import { forwardRef, Module } from '@nestjs/common';
import { PracticeReadingsService } from './practice-readings.service';
import { PracticeReadingsController } from './practice-readings.controller';
import { DocumentPracticeReadingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PracticesModule } from '../practices/practices.module';
import { PracticeReadingTypesModule } from '../practice-reading-types/practice-reading-types.module';

@Module({
  imports: [
    DocumentPracticeReadingPersistenceModule,
    CloudinaryModule,
    forwardRef(() => PracticesModule),
    forwardRef(() => PracticeReadingTypesModule),
  ],
  controllers: [PracticeReadingsController],
  providers: [PracticeReadingsService],
  exports: [PracticeReadingsService, DocumentPracticeReadingPersistenceModule],
})
export class PracticeReadingsModule {}
