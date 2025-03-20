import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { DocumentPracticePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { TopicsModule } from '../topics/topics.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [DocumentPracticePersistenceModule, TopicsModule, CloudinaryModule],
  controllers: [PracticesController],
  providers: [PracticesService],
  exports: [PracticesService, DocumentPracticePersistenceModule],
})
export class PracticesModule {}
