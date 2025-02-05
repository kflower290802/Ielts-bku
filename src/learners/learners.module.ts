import { Module } from '@nestjs/common';
import { learnersService } from './learners.service';
import { learnersController } from './learners.controller';
import { DocumentlearnerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    DocumentlearnerPersistenceModule,
  ],
  controllers: [learnersController],
  providers: [learnersService],
  exports: [learnersService, DocumentlearnerPersistenceModule],
})
export class learnersModule {}
