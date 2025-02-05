import { Module } from '@nestjs/common';
import { examsService } from './exams.service';
import { examsController } from './exams.controller';
import { DocumentexamPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentexamPersistenceModule,
  ],
  controllers: [examsController],
  providers: [examsService],
  exports: [examsService, DocumentexamPersistenceModule],
})
export class examsModule {}
