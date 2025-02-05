import { Module } from '@nestjs/common';
import { lessonsService } from './lessons.service';
import { lessonsController } from './lessons.controller';
import { DocumentlessonPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentlessonPersistenceModule,
  ],
  controllers: [lessonsController],
  providers: [lessonsService],
  exports: [lessonsService, DocumentlessonPersistenceModule],
})
export class lessonsModule {}
