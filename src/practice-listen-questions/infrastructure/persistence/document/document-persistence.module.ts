import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeListenQuestionSchema,
  PracticeListenQuestionSchemaClass,
} from './entities/practice-listen-question.schema';
import { PracticeListenQuestionRepository } from '../practice-listen-question.repository';
import { PracticeListenQuestionDocumentRepository } from './repositories/practice-listen-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeListenQuestionSchemaClass.name,
        schema: PracticeListenQuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeListenQuestionRepository,
      useClass: PracticeListenQuestionDocumentRepository,
    },
  ],
  exports: [PracticeListenQuestionRepository],
})
export class DocumentPracticeListenQuestionPersistenceModule {}
