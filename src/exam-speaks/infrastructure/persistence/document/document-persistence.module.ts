import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamSpeakSchema,
  ExamSpeakSchemaClass,
} from './entities/exam-speak.schema';
import { ExamSpeakRepository } from '../exam-speak.repository';
import { ExamSpeakDocumentRepository } from './repositories/exam-speak.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamSpeakSchemaClass.name, schema: ExamSpeakSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamSpeakRepository,
      useClass: ExamSpeakDocumentRepository,
    },
  ],
  exports: [ExamSpeakRepository],
})
export class DocumentExamSpeakPersistenceModule {}
