import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeSchema,
  PracticeSchemaClass,
} from './entities/practice.schema';
import { PracticeRepository } from '../practice.repository';
import { PracticeDocumentRepository } from './repositories/practice.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PracticeSchemaClass.name, schema: PracticeSchema },
    ]),
  ],
  providers: [
    {
      provide: PracticeRepository,
      useClass: PracticeDocumentRepository,
    },
  ],
  exports: [PracticeRepository],
})
export class DocumentPracticePersistenceModule {}
