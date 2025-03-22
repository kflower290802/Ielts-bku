import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeListenSchema,
  PracticeListenSchemaClass,
} from './entities/practice-listen.schema';
import { PracticeListenRepository } from '../practice-listen.repository';
import { PracticeListenDocumentRepository } from './repositories/practice-listen.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PracticeListenSchemaClass.name, schema: PracticeListenSchema },
    ]),
  ],
  providers: [
    {
      provide: PracticeListenRepository,
      useClass: PracticeListenDocumentRepository,
    },
  ],
  exports: [PracticeListenRepository],
})
export class DocumentPracticeListenPersistenceModule {}
