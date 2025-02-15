import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { examSchema, ExamSchemaClass } from './entities/exam.schema';
import { ExamRepository } from '../exam.repository';
import { examDocumentRepository } from './repositories/exam.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamSchemaClass.name, schema: examSchema },
    ]),
  ],
  providers: [
    {
      provide: ExamRepository,
      useClass: examDocumentRepository,
    },
  ],
  exports: [ExamRepository],
})
export class DocumentExamPersistenceModule {}
