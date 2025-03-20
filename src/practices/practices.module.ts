import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { DocumentPracticePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPracticePersistenceModule],
  controllers: [PracticesController],
  providers: [PracticesService],
  exports: [PracticesService, DocumentPracticePersistenceModule],
})
export class PracticesModule {}
