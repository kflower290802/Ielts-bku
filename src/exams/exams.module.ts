import { forwardRef, Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { DocumentExamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ExamPassagesModule } from '../exam-passages/exam-passages.module';

@Module({
  imports: [
    DocumentExamPersistenceModule,
    CloudinaryModule,
    forwardRef(() => ExamPassagesModule),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService, DocumentExamPersistenceModule],
})
export class ExamsModule {}
