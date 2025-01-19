import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { DocumentHistoryPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentHistoryPersistenceModule],
  controllers: [HistoriesController],
  providers: [HistoriesService],
  exports: [HistoriesService, DocumentHistoryPersistenceModule],
})
export class HistoriesModule {}
