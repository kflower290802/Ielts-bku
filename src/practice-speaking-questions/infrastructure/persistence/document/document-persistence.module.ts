import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeSpeakingQuestionSchema,
  PracticeSpeakingQuestionSchemaClass,
} from './entities/practice-speaking-question.schema';
import { PracticeSpeakingQuestionRepository } from '../practice-speaking-question.repository';
import { PracticeSpeakingQuestionDocumentRepository } from './repositories/practice-speaking-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeSpeakingQuestionSchemaClass.name,
        schema: PracticeSpeakingQuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeSpeakingQuestionRepository,
      useClass: PracticeSpeakingQuestionDocumentRepository,
    },
  ],
  exports: [PracticeSpeakingQuestionRepository],
})
export class DocumentPracticeSpeakingQuestionPersistenceModule {}
