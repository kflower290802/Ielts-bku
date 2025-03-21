import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeReadingSchema,
  PracticeReadingSchemaClass,
} from './entities/practice-reading.schema';
import { PracticeReadingRepository } from '../practice-reading.repository';
import { PracticeReadingDocumentRepository } from './repositories/practice-reading.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PracticeReadingSchemaClass.name, schema: PracticeReadingSchema },
    ]),
  ],
  providers: [
    {
      provide: PracticeReadingRepository,
      useClass: PracticeReadingDocumentRepository,
    },
  ],
  exports: [PracticeReadingRepository],
})
export class DocumentPracticeReadingPersistenceModule {}
