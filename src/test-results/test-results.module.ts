import { Module } from '@nestjs/common';
import { test_resultsService } from './test-results.service';
import { test_resultsController } from './test-results.controller';
import { Documenttest_resultPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    Documenttest_resultPersistenceModule,
  ],
  controllers: [test_resultsController],
  providers: [test_resultsService],
  exports: [test_resultsService, Documenttest_resultPersistenceModule],
})
export class test_resultsModule {}
