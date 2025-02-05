import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { unitSchema, unitSchemaClass } from './entities/unit.schema';
import { unitRepository } from '../unit.repository';
import { unitDocumentRepository } from './repositories/unit.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: unitSchemaClass.name, schema: unitSchema },
    ]),
  ],
  providers: [
    {
      provide: unitRepository,
      useClass: unitDocumentRepository,
    },
  ],
  exports: [unitRepository],
})
export class DocumentunitPersistenceModule {}
