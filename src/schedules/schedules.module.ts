import { Module } from '@nestjs/common';
import { schedulesService } from './schedules.service';
import { schedulesController } from './schedules.controller';
import { DocumentschedulePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentschedulePersistenceModule,
  ],
  controllers: [schedulesController],
  providers: [schedulesService],
  exports: [schedulesService, DocumentschedulePersistenceModule],
})
export class schedulesModule {}
