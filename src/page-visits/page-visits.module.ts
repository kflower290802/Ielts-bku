import { Module } from '@nestjs/common';
import { PageVisitsService } from './page-visits.service';
import { PageVisitsController } from './page-visits.controller';
import { DocumentPageVisitPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPageVisitPersistenceModule],
  controllers: [PageVisitsController],
  providers: [PageVisitsService],
  exports: [PageVisitsService, DocumentPageVisitPersistenceModule],
})
export class PageVisitsModule {}
