import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExamWritingSchema,
  UserExamWritingSchemaClass,
} from './entities/user-exam-writing.schema';
import { UserExamWritingRepository } from '../user-exam-writing.repository';
import { UserExamWritingDocumentRepository } from './repositories/user-exam-writing.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserExamWritingSchemaClass.name, schema: UserExamWritingSchema },
    ]),
  ],
  providers: [
    {
      provide: UserExamWritingRepository,
      useClass: UserExamWritingDocumentRepository,
    },
  ],
  exports: [UserExamWritingRepository],
})
export class DocumentUserExamWritingPersistenceModule {}
