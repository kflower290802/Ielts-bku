import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPracticeSchema,
  UserPracticeSchemaClass,
} from './entities/user-practice.schema';
import { UserPracticeRepository } from '../user-practice.repository';
import { UserPracticeDocumentRepository } from './repositories/user-practice.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPracticeSchemaClass.name, schema: UserPracticeSchema },
    ]),
  ],
  providers: [
    {
      provide: UserPracticeRepository,
      useClass: UserPracticeDocumentRepository,
    },
  ],
  exports: [UserPracticeRepository],
})
export class DocumentUserPracticePersistenceModule {}
