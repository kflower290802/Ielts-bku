import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { testSchema, testSchemaClass } from './entities/test.schema';
import { testRepository } from '../test.repository';
import { testDocumentRepository } from './repositories/test.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: testSchemaClass.name, schema: testSchema },
    ]),
  ],
  providers: [
    {
      provide: testRepository,
      useClass: testDocumentRepository,
    },
  ],
  exports: [testRepository],
})
export class DocumenttestPersistenceModule {}
