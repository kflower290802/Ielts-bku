import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeReadingTypeSchema,
  PracticeReadingTypeSchemaClass,
} from './entities/practice-reading-type.schema';
import { PracticeReadingTypeRepository } from '../practice-reading-type.repository';
import { PracticeReadingTypeDocumentRepository } from './repositories/practice-reading-type.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeReadingTypeSchemaClass.name,
        schema: PracticeReadingTypeSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeReadingTypeRepository,
      useClass: PracticeReadingTypeDocumentRepository,
    },
  ],
  exports: [PracticeReadingTypeRepository],
})
export class DocumentPracticeReadingTypePersistenceModule {}
