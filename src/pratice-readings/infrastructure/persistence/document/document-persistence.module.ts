import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PraticeReadingSchema,
  PraticeReadingSchemaClass,
} from './entities/pratice-reading.schema';
import { PraticeReadingRepository } from '../pratice-reading.repository';
import { PraticeReadingDocumentRepository } from './repositories/pratice-reading.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PraticeReadingSchemaClass.name, schema: PraticeReadingSchema },
    ]),
  ],
  providers: [
    {
      provide: PraticeReadingRepository,
      useClass: PraticeReadingDocumentRepository,
    },
  ],
  exports: [PraticeReadingRepository],
})
export class DocumentPraticeReadingPersistenceModule {}
