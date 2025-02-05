import { Module } from '@nestjs/common';
import { questionsService } from './questions.service';
import { questionsController } from './questions.controller';
import { DocumentquestionPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentquestionPersistenceModule,
  ],
  controllers: [questionsController],
  providers: [questionsService],
  exports: [questionsService, DocumentquestionPersistenceModule],
})
export class questionsModule {}
