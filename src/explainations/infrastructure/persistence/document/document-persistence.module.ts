import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExplainationSchema,
  ExplainationSchemaClass,
} from './entities/explaination.schema';
import { ExplainationRepository } from '../explaination.repository';
import { ExplainationDocumentRepository } from './repositories/explaination.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExplainationSchemaClass.name, schema: ExplainationSchema },
    ]),
  ],
  providers: [
    {
      provide: ExplainationRepository,
      useClass: ExplainationDocumentRepository,
    },
  ],
  exports: [ExplainationRepository],
})
export class DocumentExplainationPersistenceModule {}
