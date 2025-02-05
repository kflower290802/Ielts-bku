import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  question_resultSchema,
  question_resultSchemaClass,
} from './entities/question-result.schema';
import { question_resultRepository } from '../question-result.repository';
import { question_resultDocumentRepository } from './repositories/question-result.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: question_resultSchemaClass.name, schema: question_resultSchema },
    ]),
  ],
  providers: [
    {
      provide: question_resultRepository,
      useClass: question_resultDocumentRepository,
    },
  ],
  exports: [question_resultRepository],
})
export class Documentquestion_resultPersistenceModule {}
