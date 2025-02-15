import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { DocumentExamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [DocumentExamPersistenceModule, CloudinaryModule],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService, DocumentExamPersistenceModule],
})
export class ExamsModule {}
