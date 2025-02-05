import { Module } from '@nestjs/common';
import { choicesService } from './choices.service';
import { choicesController } from './choices.controller';
import { DocumentchoicePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentchoicePersistenceModule,
  ],
  controllers: [choicesController],
  providers: [choicesService],
  exports: [choicesService, DocumentchoicePersistenceModule],
})
export class choicesModule {}
