import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeListenTypeSchema,
  PracticeListenTypeSchemaClass,
} from './entities/practice-listen-type.schema';
import { PracticeListenTypeRepository } from '../practice-listen-type.repository';
import { PracticeListenTypeDocumentRepository } from './repositories/practice-listen-type.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeListenTypeSchemaClass.name,
        schema: PracticeListenTypeSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeListenTypeRepository,
      useClass: PracticeListenTypeDocumentRepository,
    },
  ],
  exports: [PracticeListenTypeRepository],
})
export class DocumentPracticeListenTypePersistenceModule {}
