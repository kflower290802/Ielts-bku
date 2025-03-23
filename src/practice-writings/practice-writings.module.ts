import { Module } from '@nestjs/common';
import { PracticeWritingsService } from './practice-writings.service';
import { PracticeWritingsController } from './practice-writings.controller';
import { DocumentPracticeWritingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [DocumentPracticeWritingPersistenceModule, CloudinaryModule],
  controllers: [PracticeWritingsController],
  providers: [PracticeWritingsService],
  exports: [PracticeWritingsService, DocumentPracticeWritingPersistenceModule],
})
export class PracticeWritingsModule {}
