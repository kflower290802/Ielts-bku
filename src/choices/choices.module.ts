import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { choicesController } from './choices.controller';
import { DocumentChoicePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentChoicePersistenceModule,
  ],
  controllers: [choicesController],
  providers: [ChoicesService],
  exports: [ChoicesService, DocumentChoicePersistenceModule],
})
export class ChoicesModule {}
