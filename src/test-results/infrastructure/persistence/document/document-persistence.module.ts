import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  test_resultSchema,
  test_resultSchemaClass,
} from './entities/test-result.schema';
import { test_resultRepository } from '../test-result.repository';
import { test_resultDocumentRepository } from './repositories/test-result.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: test_resultSchemaClass.name, schema: test_resultSchema },
    ]),
  ],
  providers: [
    {
      provide: test_resultRepository,
      useClass: test_resultDocumentRepository,
    },
  ],
  exports: [test_resultRepository],
})
export class Documenttest_resultPersistenceModule {}
