import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { examSchema, examSchemaClass } from './entities/exam.schema';
import { examRepository } from '../exam.repository';
import { examDocumentRepository } from './repositories/exam.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: examSchemaClass.name, schema: examSchema },
    ]),
  ],
  providers: [
    {
      provide: examRepository,
      useClass: examDocumentRepository,
    },
  ],
  exports: [examRepository],
})
export class DocumentexamPersistenceModule {}
