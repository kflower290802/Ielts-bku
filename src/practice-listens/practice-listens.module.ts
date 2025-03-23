import { Module } from '@nestjs/common';
import { PracticeListensService } from './practice-listens.service';
import { PracticeListensController } from './practice-listens.controller';
import { DocumentPracticeListenPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PracticeListenTypesModule } from '../practice-listen-types/practice-listen-types.module';

@Module({
  imports: [
    DocumentPracticeListenPersistenceModule,
    CloudinaryModule,
    PracticeListenTypesModule,
  ],
  controllers: [PracticeListensController],
  providers: [PracticeListensService],
  exports: [PracticeListensService, DocumentPracticeListenPersistenceModule],
})
export class PracticeListensModule {}
