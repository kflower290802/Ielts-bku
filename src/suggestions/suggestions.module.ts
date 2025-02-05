import { Module } from '@nestjs/common';
import { suggestionsService } from './suggestions.service';
import { suggestionsController } from './suggestions.controller';
import { DocumentsuggestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentsuggestionPersistenceModule,
  ],
  controllers: [suggestionsController],
  providers: [suggestionsService],
  exports: [suggestionsService, DocumentsuggestionPersistenceModule],
})
export class suggestionsModule {}
