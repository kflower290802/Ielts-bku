import { Module } from '@nestjs/common';
import { ExamWritingsService } from './exam-writings.service';
import { ExamWritingsController } from './exam-writings.controller';
import { DocumentExamWritingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserExamWritingsModule } from '../user-exam-writings/user-exam-writings.module';

@Module({
  imports: [
    DocumentExamWritingPersistenceModule,
    CloudinaryModule,
    UserExamWritingsModule,
  ],
  controllers: [ExamWritingsController],
  providers: [ExamWritingsService],
  exports: [ExamWritingsService, DocumentExamWritingPersistenceModule],
})
export class ExamWritingsModule {}
