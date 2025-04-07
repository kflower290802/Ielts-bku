import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GrammarPointSchema,
  GrammarPointSchemaClass,
} from './entities/grammar-point.schema';
import { GrammarPointRepository } from '../grammar-point.repository';
import { GrammarPointDocumentRepository } from './repositories/grammar-point.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GrammarPointSchemaClass.name, schema: GrammarPointSchema },
    ]),
  ],
  providers: [
    {
      provide: GrammarPointRepository,
      useClass: GrammarPointDocumentRepository,
    },
  ],
  exports: [GrammarPointRepository],
})
export class DocumentGrammarPointPersistenceModule {}
