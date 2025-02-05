import { Module } from '@nestjs/common';
import { notesService } from './notes.service';
import { notesController } from './notes.controller';
import { DocumentnotePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentnotePersistenceModule,
  ],
  controllers: [notesController],
  providers: [notesService],
  exports: [notesService, DocumentnotePersistenceModule],
})
export class notesModule {}
