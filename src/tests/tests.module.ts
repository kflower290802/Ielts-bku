import { Module } from '@nestjs/common';
import { testsService } from './tests.service';
import { testsController } from './tests.controller';
import { DocumenttestPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumenttestPersistenceModule,
  ],
  controllers: [testsController],
  providers: [testsService],
  exports: [testsService, DocumenttestPersistenceModule],
})
export class testsModule {}
