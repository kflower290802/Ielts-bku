import { Module } from '@nestjs/common';
import { PraticeReadingsService } from './pratice-readings.service';
import { PraticeReadingsController } from './pratice-readings.controller';
import { DocumentPraticeReadingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPraticeReadingPersistenceModule],
  controllers: [PraticeReadingsController],
  providers: [PraticeReadingsService],
  exports: [PraticeReadingsService, DocumentPraticeReadingPersistenceModule],
})
export class PraticeReadingsModule {}
