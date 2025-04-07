import { Module } from '@nestjs/common';
import { GrammarPointsService } from './grammar-points.service';
import { GrammarPointsController } from './grammar-points.controller';
import { DocumentGrammarPointPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentGrammarPointPersistenceModule],
  controllers: [GrammarPointsController],
  providers: [GrammarPointsService],
  exports: [GrammarPointsService, DocumentGrammarPointPersistenceModule],
})
export class GrammarPointsModule {}
