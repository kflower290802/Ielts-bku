import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExamSessionSchema,
  UserExamSessionSchemaClass,
} from './entities/user-exam-session.schema';
import { UserExamSessionRepository } from '../user-exam-session.repository';
import { UserExamSessionDocumentRepository } from './repositories/user-exam-session.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserExamSessionSchemaClass.name, schema: UserExamSessionSchema },
    ]),
  ],
  providers: [
    {
      provide: UserExamSessionRepository,
      useClass: UserExamSessionDocumentRepository,
    },
  ],
  exports: [UserExamSessionRepository],
})
export class DocumentUserExamSessionPersistenceModule {}
