import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExamSchema,
  UserExamSchemaClass,
} from './entities/user-exam.schema';
import { UserExamRepository } from '../user-exam.repository';
import { UserExamDocumentRepository } from './repositories/user-exam.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserExamSchemaClass.name, schema: UserExamSchema },
    ]),
  ],
  providers: [
    {
      provide: UserExamRepository,
      useClass: UserExamDocumentRepository,
    },
  ],
  exports: [UserExamRepository],
})
export class DocumentUserExamPersistenceModule {}
