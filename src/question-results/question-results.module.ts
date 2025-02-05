import { Module } from '@nestjs/common';
import { question_resultsService } from './question-results.service';
import { question_resultsController } from './question-results.controller';
import { Documentquestion_resultPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    Documentquestion_resultPersistenceModule,
  ],
  controllers: [question_resultsController],
  providers: [question_resultsService],
  exports: [question_resultsService, Documentquestion_resultPersistenceModule],
})
export class question_resultsModule {}
