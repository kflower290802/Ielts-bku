import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamPassageSchema,
  ExamPassageSchemaClass,
} from './entities/exam-passage.schema';
import { ExamPassageRepository } from '../exam-passage.repository';
import { ExamPassageDocumentRepository } from './repositories/exam-passage.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamPassageSchemaClass.name, schema: ExamPassageSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamPassageRepository,
      useClass: ExamPassageDocumentRepository,
    },
  ],
  exports: [ExamPassageRepository],
})
export class DocumentExamPassagePersistenceModule {}
