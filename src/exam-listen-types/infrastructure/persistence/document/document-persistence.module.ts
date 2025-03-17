import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamListenTypeSchema,
  ExamListenTypeSchemaClass,
} from './entities/exam-listen-type.schema';
import { ExamListenTypeRepository } from '../exam-listen-type.repository';
import { ExamListenTypeDocumentRepository } from './repositories/exam-listen-type.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamListenTypeSchemaClass.name, schema: ExamListenTypeSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamListenTypeRepository,
      useClass: ExamListenTypeDocumentRepository,
    },
  ],
  exports: [ExamListenTypeRepository],
})
export class DocumentExamListenTypePersistenceModule {}
