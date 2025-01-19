import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema, HistorySchemaClass } from './entities/history.schema';
import { HistoryRepository } from '../history.repository';
import { HistoryDocumentRepository } from './repositories/history.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HistorySchemaClass.name, schema: HistorySchema },
    ]),
  ],
  providers: [
    {
      provide: HistoryRepository,
      useClass: HistoryDocumentRepository,
    },
  ],
  exports: [HistoryRepository],
})
export class DocumentHistoryPersistenceModule {}
