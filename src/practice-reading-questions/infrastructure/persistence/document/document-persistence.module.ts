import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeReadingQuestionSchema,
  PracticeReadingQuestionSchemaClass,
} from './entities/practice-reading-question.schema';
import { PracticeReadingQuestionRepository } from '../practice-reading-question.repository';
import { PracticeReadingQuestionDocumentRepository } from './repositories/practice-reading-question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeReadingQuestionSchemaClass.name,
        schema: PracticeReadingQuestionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeReadingQuestionRepository,
      useClass: PracticeReadingQuestionDocumentRepository,
    },
  ],
  exports: [PracticeReadingQuestionRepository],
})
export class DocumentPracticeReadingQuestionPersistenceModule {}
