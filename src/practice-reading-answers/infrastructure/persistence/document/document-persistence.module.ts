import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PracticeReadingAnswerSchema,
  PracticeReadingAnswerSchemaClass,
} from './entities/practice-reading-answer.schema';
import { PracticeReadingAnswerRepository } from '../practice-reading-answer.repository';
import { PracticeReadingAnswerDocumentRepository } from './repositories/practice-reading-answer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PracticeReadingAnswerSchemaClass.name,
        schema: PracticeReadingAnswerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: PracticeReadingAnswerRepository,
      useClass: PracticeReadingAnswerDocumentRepository,
    },
  ],
  exports: [PracticeReadingAnswerRepository],
})
export class DocumentPracticeReadingAnswerPersistenceModule {}
