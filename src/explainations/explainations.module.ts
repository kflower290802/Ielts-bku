import { Module } from '@nestjs/common';
import { ExplainationsService } from './explainations.service';
import { ExplainationsController } from './explainations.controller';
import { DocumentExplainationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentExplainationPersistenceModule,
  ],
  controllers: [ExplainationsController],
  providers: [ExplainationsService],
  exports: [ExplainationsService, DocumentExplainationPersistenceModule],
})
export class ExplainationsModule {}
