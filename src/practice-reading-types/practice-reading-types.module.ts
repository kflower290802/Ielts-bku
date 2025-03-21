import { Module } from '@nestjs/common';
import { PracticeReadingTypesService } from './practice-reading-types.service';
import { PracticeReadingTypesController } from './practice-reading-types.controller';
import { DocumentPracticeReadingTypePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { PracticeReadingsModule } from '../practice-readings/practice-readings.module';

@Module({
  imports: [
    DocumentPracticeReadingTypePersistenceModule,
    PracticeReadingsModule,
  ],
  controllers: [PracticeReadingTypesController],
  providers: [PracticeReadingTypesService],
  exports: [
    PracticeReadingTypesService,
    DocumentPracticeReadingTypePersistenceModule,
  ],
})
export class PracticeReadingTypesModule {}
