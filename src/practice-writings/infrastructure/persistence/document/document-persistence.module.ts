import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeWritingSchema,
  PracticeWritingSchemaClass,
} from './entities/practice-writing.schema';
import { PracticeWritingRepository } from '../practice-writing.repository';
import { PracticeWritingDocumentRepository } from './repositories/practice-writing.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PracticeWritingSchemaClass.name, schema: PracticeWritingSchema },
    ]),
  ],
  providers: [
    {
      provide: PracticeWritingRepository,
      useClass: PracticeWritingDocumentRepository,
    },
  ],
  exports: [PracticeWritingRepository],
})
export class DocumentPracticeWritingPersistenceModule {}
