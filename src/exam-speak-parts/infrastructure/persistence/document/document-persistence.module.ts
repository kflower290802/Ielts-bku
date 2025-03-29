import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamSpeakPartSchema,
  ExamSpeakPartSchemaClass,
} from './entities/exam-speak-part.schema';
import { ExamSpeakPartRepository } from '../exam-speak-part.repository';
import { ExamSpeakPartDocumentRepository } from './repositories/exam-speak-part.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamSpeakPartSchemaClass.name, schema: ExamSpeakPartSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamSpeakPartRepository,
      useClass: ExamSpeakPartDocumentRepository,
    },
  ],
  exports: [ExamSpeakPartRepository],
})
export class DocumentExamSpeakPartPersistenceModule {}
