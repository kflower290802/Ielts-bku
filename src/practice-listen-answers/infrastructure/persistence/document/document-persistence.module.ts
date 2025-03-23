import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeListenAnswerSchema,
  PracticeListenAnswerSchemaClass,
} from './entities/practice-listen-answer.schema';
import { PracticeListenAnswerRepository } from '../practice-listen-answer.repository';
import { PracticeListenAnswerDocumentRepository } from './repositories/practice-listen-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeListenAnswerSchemaClass.name,
        schema: PracticeListenAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeListenAnswerRepository,
      useClass: PracticeListenAnswerDocumentRepository,
    },
  ],
  exports: [PracticeListenAnswerRepository],
})
export class DocumentPracticeListenAnswerPersistenceModule {}
