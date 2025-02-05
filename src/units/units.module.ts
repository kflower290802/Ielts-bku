import { Module } from '@nestjs/common';
import { unitsService } from './units.service';
import { unitsController } from './units.controller';
import { DocumentunitPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentunitPersistenceModule,
  ],
  controllers: [unitsController],
  providers: [unitsService],
  exports: [unitsService, DocumentunitPersistenceModule],
})
export class unitsModule {}
